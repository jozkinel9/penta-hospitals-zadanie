// src/reservation/dto/create-reservation.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dueDate: string;
}
