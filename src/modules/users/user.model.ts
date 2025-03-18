import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  DRIVER = 'driver',
}

export class User extends TimeStamps {
  @prop()
  name: string;

  @prop({ unique: true })
  email: string;

  @prop()
  password: string;

  @prop()
  phoneNo: string;

  @prop({ enum: Role, default: Role.CUSTOMER })
  role: Role;
}
