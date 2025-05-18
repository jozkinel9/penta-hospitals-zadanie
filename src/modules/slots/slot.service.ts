import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Slot } from './entities/slot.entity';
import { PublishSlotsDto } from './dto/publish-slots.dto';
import { Sequelize } from 'sequelize-typescript';
import { SlotBatch } from './entities/slot-batch.entity';
import { Transaction } from 'sequelize';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class SlotService {
  constructor(
    @InjectModel(Slot) private readonly slotModel: typeof Slot,
    @InjectModel(SlotBatch) private readonly slotBatchModel: typeof SlotBatch,
    private readonly sequelize: Sequelize,
  ) {}

  async publishSlots(dto: PublishSlotsDto): Promise<ApiResponse<void>> {
    const transaction = await this.sequelize.transaction();

    try {
      const batchStartDate = new Date(dto.startDateAndTime);

      let batch = await this.slotBatchModel.findOne({
        where: { startDateAndTime: batchStartDate },
        transaction,
      });

      if (!batch) {
        batch = await this.slotBatchModel.create(
          { startDateAndTime: batchStartDate },
          { transaction },
        );
      }

      let createdCount = 0;
      let updatedCount = 0;
      const batchId = batch.id as number;

      for (const { date, capacity } of dto.slots) {
        const slotDate = new Date(date);

        const existingSlot = await this.slotModel.findOne({
          where: { date: slotDate, slotBatchId: batchId },
          transaction,
        });

        if (existingSlot) {
          const existingSlotCapacity = existingSlot.get('capacity');
          if (existingSlotCapacity !== capacity) {
            existingSlot.set('capacity', capacity);
            await existingSlot.save({ transaction });
            updatedCount++;
          }
        } else {
          await this.slotModel.create(
            {
              date: slotDate,
              capacity,
              bookedCount: 0,
              slotBatchId: batchId,
            },
            { transaction },
          );
          createdCount++;
        }
      }

      await transaction.commit();

      return {
        success: true,
        message: `Slots published successfully. Created: ${createdCount}, Updated: ${updatedCount}.`,
      };
    } catch (error) {
      await transaction.rollback();

      const message = error instanceof Error ? error.message : String(error);

      return {
        success: false,
        message: `Failed to publish slots: ${message}`,
      };
    }
  }

  async findAvailableSlot(dates: string[], transaction?: Transaction) {
    return this.slotModel.findOne({
      where: { date: dates },
      order: [['date', 'ASC']],
      include: [SlotBatch],
      transaction,
    });
  }

  async incrementBookedCount(slot: Slot, transaction?: Transaction) {
    await slot.increment('bookedCount', { transaction });
  }
}
