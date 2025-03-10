import { prop } from '@typegoose/typegoose';

export class User {
  @prop()
  name: string;

  @prop({ unique: true })
  email: string;

  @prop({})
  password: string;

  @prop()
  phoneNo: string;
}
