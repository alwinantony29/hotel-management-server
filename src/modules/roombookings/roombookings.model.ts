import { prop, Ref } from '@typegoose/typegoose';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../users/user.model';
import { Room } from '../rooms/rooms.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class RoomBooking extends TimeStamps {
  @prop({ ref: () => User, type: () => String })
  userId: Ref<User>;

  @prop({ ref: () => Room, type: () => String })
  @IsMongoId({ message: 'Invalid roomId' })
  roomId: Ref<Room>;

  @prop()
  @IsNumber()
  @Min(1, { message: 'Total people must be at least 1' })
  totalPeople: number;

  @prop({ default: false })
  isPaid: boolean;

  @prop()
  totalPrice: number;

  @prop()
  paymentMethod: string;

  @prop({ enum: ['confirmed', 'cancelled'] })
  @IsEnum(['confirmed', 'cancelled'], {
    message: 'Status must be confirmed or cancelled',
  })
  status: string;

  @prop()
  @IsNotEmpty({ message: 'Check-in date is required' })
  @IsDate({ message: 'Invalid from date' })
  @Type(() => Date)
  from: Date;

  @prop()
  @IsNotEmpty({ message: 'Check-out date is required' })
  @IsDate({ message: 'Invalid to date' })
  @Type(() => Date)
  to: Date;

  @prop()
  requests: string;
}
