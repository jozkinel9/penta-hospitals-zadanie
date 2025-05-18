import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Slot } from './modules/slots/entities/slot.entity';
import { Reservation } from './modules/reservations/entities/reservation.entity';
import { SlotModule } from './modules/slots/slot.module';
import { ReservationModule } from './modules/reservations/reservation.module';
import { SlotBatch } from './modules/slots/entities/slot-batch.entity';
import { User } from './modules/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      // synchronize: true,
      models: [Slot, Reservation, SlotBatch, User],
    }),
    SlotModule,
    ReservationModule,
  ],
})
export class AppModule {}
