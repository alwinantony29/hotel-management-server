import { prop } from '@typegoose/typegoose';

export class Room {
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
