import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Slot } from './entities/slot.entity';
import { SlotService } from './slot.service';
import { SlotBatch } from './entities/slot-batch.entity';
import { SlotsController } from './slots.controller';

@Module({
  imports: [SequelizeModule.forFeature([Slot, SlotBatch])],
  providers: [SlotService],
  controllers: [SlotsController],
  exports: [SlotService],
})
export class SlotModule {}
