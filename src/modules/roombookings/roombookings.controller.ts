import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RoombookingsService } from './roombookings.service';
import { RoomBooking } from './roombookings.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('roombookings')
export class RoombookingsController {
  constructor(private readonly roombookingsService: RoombookingsService) {}

  @Post()
  create(
    @Req() req,
    @Body() booking: Omit<RoomBooking, 'userId'>,
  ): Promise<RoomBooking> {
    return this.roombookingsService.create(req.user.userId, booking);
  }

  @Get()
  findAll(): Promise<RoomBooking[]> {
    return this.roombookingsService.findAll();
  }

  @Get('mine')
  findMyBookings(@Req() req): Promise<RoomBooking[]> {
    const userId = req.user.userId;
    return this.roombookingsService.findAll({ userId });
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
