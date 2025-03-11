import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { RoombookingsService } from './roombookings.service';
import { RoomBooking } from './roombookings.model';

@Controller('roombookings')
export class RoombookingsController {
  constructor(private readonly roombookingsService: RoombookingsService) {}

  @Post()
  create(@Body() booking: Partial<RoomBooking>): Promise<RoomBooking> {
    return this.roombookingsService.create(booking);
  }

  @Get()
  findAll(): Promise<RoomBooking[]> {
    return this.roombookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoomBooking> {
    return this.roombookingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() booking: Partial<RoomBooking>,
  ): Promise<RoomBooking> {
    return this.roombookingsService.update(id, booking);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.roombookingsService.remove(id);
  }
}
