import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcryptjs from 'bcryptjs';

const salt = bcryptjs.genSaltSync(10);
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(createUserDto: User) {
    const encrypted = bcryptjs.hashSync(createUserDto.password, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: encrypted,
    });

    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async changePassword(
    userId: string,
    {
      newPassword,
      currentPassword,
    }: { currentPassword: string; newPassword: string },
  ) {
    const user = await this.userModel.findById(userId).exec();

    const oldPasswordMatched = bcryptjs.compare(currentPassword, user.password);
    if (!oldPasswordMatched) {
      throw new BadRequestException('Password does not match');
    }
    const newEncryptedPassword = bcryptjs.hashSync(newPassword, salt);

    const updatedUser = await user
      .updateOne({
        password: newEncryptedPassword,
      })
      .exec();
    return updatedUser;
  }

  async update(id: string, updateUserDto: Partial<User>) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
