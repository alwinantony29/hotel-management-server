import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: User) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/change-password')
  async changePassword(
    @Body() changePasswordDto: { oldPassword: string; newPassword: string },
    @Req() req,
  ) {
    return this.usersService.changePassword(req.user.userId, changePasswordDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) throw new NotFoundException('User not found');

    return updatedUser;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
