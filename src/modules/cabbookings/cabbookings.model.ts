import { prop, Ref } from '@typegoose/typegoose';
import { User } from '../users/user.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class CabBooking extends TimeStamps {
  @prop({ ref: () => User, type: () => String })
  userId: Ref<User>;

  @prop({ ref: () => User, type: () => String })
  driverId: Ref<User>;

  @prop()
  pickUpAddress: string;

  @prop()
  date: Date;

  @prop()
  status: string;

  @prop()
  fare: number;
}
