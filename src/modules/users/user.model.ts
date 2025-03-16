import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class User extends TimeStamps {
  @prop()
  name: string;

  @prop({ unique: true })
  email: string;

  @prop({})
  password: string;

  @prop()
  phoneNo: string;
}
