import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { User } from '../users/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { SlotService } from '../slots/slot.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Reservation)
    private readonly reservationModel: typeof Reservation,
    private slotService: SlotService,
    private readonly sequelize: Sequelize,
  ) {}

  async createReservation(dto: CreateReservationDto) {
    const transaction = await this.sequelize.transaction();

    try {
      let user = await this.userModel.findOne({
        where: { email: dto.email, dueDate: new Date(dto.dueDate) },
        transaction,
      });
      if (user) {
        const existingReservation = await this.reservationModel.findOne({
          where: { userId: user.id },
          transaction,
        });
        if (existingReservation) {
          throw new BadRequestException(
            'User already has a reservation for this due date',
          );
        }
      } else {
        user = await this.userModel.create(
          {
            name: dto.name,
            surname: dto.surname,
            phone: dto.phone,
            email: dto.email,
            dueDate: new Date(dto.dueDate),
          },
          { transaction },
        );
      }

      const searchDates = this.getSearchRange(dto.dueDate);

      const slot = await this.slotService.findAvailableSlot(
        searchDates,
        transaction,
      );
      if (!slot || slot.get('bookedCount') >= slot.get('capacity')) {
        throw new BadRequestException('No available slots');
      }

      const slotBatch = slot.get('slotBatch');
      if (slotBatch && new Date() < slotBatch.get('startDateAndTime')) {
        throw new BadRequestException(
          'Reservations not open yet for this slot',
        );
      }

      const reservation = await this.reservationModel.create(
        {
          userId: user.id,
          slotId: slot.get('id'),
        },
        { transaction },
      );

      await this.slotService.incrementBookedCount(slot, transaction);

      await transaction.commit();

      return {
        success: true,
        message: `Reservation created successfully: ${reservation.id}.`,
      };
    } catch (error) {
      await transaction.rollback();
      const message = error instanceof Error ? error.message : String(error);

      return {
        success: false,
        message: `Failed create reservation: ${message}`,
      };
    }
  }

  private getSearchRange(date: string): string[] {
    const base = new Date(date);
    const range = [0, -1, 1, -2, 2];
    return range.map((d) => {
      const newDate = new Date(base);
      newDate.setDate(base.getDate() + d);
      return newDate.toISOString();
    });
  }
}
