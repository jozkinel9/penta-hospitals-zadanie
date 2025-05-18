// src/reservation/reservation.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() dto: CreateReservationDto): Promise<ApiResponse<void>> {
    return this.reservationService.createReservation(dto);
  }
}
