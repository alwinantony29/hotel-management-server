import { Module } from '@nestjs/common';
import { CabbookingsService } from './cabbookings.service';
import { CabbookingsController } from './cabbookings.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CabBooking } from './cabbookings.model';

@Module({
  imports: [TypegooseModule.forFeature([CabBooking])],
  controllers: [CabbookingsController],
  providers: [CabbookingsService],
})
export class CabbookingsModule {}
