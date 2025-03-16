import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Room extends TimeStamps {
  @prop()
  roomNo: string;

  @prop({ enum: ['deluxe', 'premium', 'ultra luxury'] })
  type: string;

  @prop()
  capacity: number;

  @prop({ enum: ['available', 'cleaning', 'booked'] })
  status: string;

  @prop()
  images: string[];

  @prop()
  description: string[];

  @prop()
  price: number;
}
