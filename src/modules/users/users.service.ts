import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(createUserDto: User) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: Partial<User>) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async login({ email, password }: Pick<User, 'email' | 'password'>) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(
        "User with this email doesn't exist, try signing up",
      );
    }
    if (user.password !== password) {
      throw new BadRequestException('email or password is wrong');
    }
    return { user };
  }

  async signup(signupData: User) {
    const createdUser = await this.create(signupData);
    return { user: createdUser };
  }
}
