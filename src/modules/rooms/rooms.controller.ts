import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './rooms.model';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() room: Partial<Room>) {
    return this.roomsService.create(room);
  }

  @Get()
  findAll(@Query() query) {
    const status = query.status;
    return this.roomsService.findAll({ status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() room: Partial<Room>) {
    return this.roomsService.update(id, room);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
