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
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmailService } from 'src/shared/email.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async create(@Body() createUserDto: User) {
    const createdUser = await this.usersService.create(createUserDto);
    await this.emailService.sentDriverOnboardingMail({
      ...createdUser.toObject(),
      rawPassword: createUserDto.password,
    });
    return createdUser;
  }

  @Get()
  async findAll(@Query() query: Record<string, any>) {
    return this.usersService.findAll(query);
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
    @Body() changePasswordDto: { currentPassword: string; newPassword: string },
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
