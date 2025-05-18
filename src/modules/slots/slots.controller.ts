import { Body, Controller, Post } from '@nestjs/common';
import { SlotService } from './slot.service';
import { PublishSlotsDto } from './dto/publish-slots.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotService: SlotService) {}

  @Post('publish-slots')
  async publishSlots(@Body() dto: PublishSlotsDto): Promise<ApiResponse<void>> {
    return this.slotService.publishSlots(dto);
  }
}
