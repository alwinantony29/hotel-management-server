import { prop, Ref } from '@typegoose/typegoose';
import { User } from '../users/user.model';
import { Room } from '../rooms/rooms.model';

export class RoomBooking {
  @prop({ ref: () => User, type: () => String })
  userId: Ref<User>;

  @prop({ ref: () => Room, type: () => String })
  roomId: Ref<Room>;

  @prop()
  totalPeople: number;

  @prop()
  isPaid: boolean;

  @prop({ enum: ['confirmed', 'cancelled'] })
  status: string;

  @prop()
  from: Date;

  @prop()
  to: Date;
}
