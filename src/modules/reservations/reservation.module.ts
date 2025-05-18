import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Slot } from '../slots/entities/slot.entity';
import { SlotBatch } from '../slots/entities/slot-batch.entity';
import { Reservation } from './entities/reservation.entity';
import { SlotModule } from '../slots/slot.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Reservation, Slot, SlotBatch]),
    SlotModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
