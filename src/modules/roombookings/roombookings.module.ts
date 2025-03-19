import { Module } from '@nestjs/common';
import { RoombookingsService } from './roombookings.service';
import { RoombookingsController } from './roombookings.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { RoomBooking } from './roombookings.model';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [TypegooseModule.forFeature([RoomBooking]), RoomsModule],
  controllers: [RoombookingsController],
  providers: [RoombookingsService],
})
export class RoombookingsModule {}
