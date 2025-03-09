import { prop } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

export class User {
  @prop()
  name: string;

  @prop({ unique: true })
  email: string;

  @prop({
    set: (password: string) => {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
    },
  })
  password: string;

  @prop()
  phoneNo: string;
}
