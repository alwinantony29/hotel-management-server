import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CabbookingsService } from './cabbookings.service';
import { CabBooking } from './cabbookings.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cabbookings')
export class CabbookingsController {
  constructor(private readonly cabbookingsService: CabbookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createCabBookingDto: Partial<CabBooking>) {
    return this.cabbookingsService.create(req.user.userId, createCabBookingDto);
  }

  @Get()
  findAll() {
    return this.cabbookingsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.cabbookingsService.findByUserId(userId);
  }

  @Get('driver/:driverId')
  findByDriver(@Param('driverId') driverId: string) {
    return this.cabbookingsService.findByDriverId(driverId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cabbookingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCabBookingDto: Partial<CabBooking>,
  ) {
    return this.cabbookingsService.update(id, updateCabBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cabbookingsService.remove(id);
  }
}
