// src/modules/slots/dto/publish-slots.dto.ts
import { IsArray, IsDateString, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SlotDayDto {
  @IsDateString()
  date: string;

  @IsInt()
  capacity: number;
}

export class PublishSlotsDto {
  @IsDateString()
  startDateAndTime: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotDayDto)
  slots: SlotDayDto[];
}
