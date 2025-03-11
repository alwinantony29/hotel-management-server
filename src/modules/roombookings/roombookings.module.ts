import { Module } from '@nestjs/common';
import { RoombookingsService } from './roombookings.service';
import { RoombookingsController } from './roombookings.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { RoomBooking } from './roombookings.model';

@Module({
  imports: [TypegooseModule.forFeature([RoomBooking])],
  controllers: [RoombookingsController],
  providers: [RoombookingsService],
})
export class RoombookingsModule {}
