import { prop } from '@typegoose/typegoose';

export class Room {
  @prop()
  name: string;

  @prop({ enum: ['deluxe', 'premium', 'ultra luxury'] })
  type: string;

  @prop()
  capacity: number;

  @prop({ enum: ['available', 'cleaning'] })
  status: string;

  @prop()
  images: string[];
}
