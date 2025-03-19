import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Room } from './rooms.model';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room)
    private readonly roomModel: ReturnModelType<typeof Room>,
  ) {}

  async create(room: Partial<Room>): Promise<Room> {
    const newRoom = new this.roomModel(room);
    return newRoom.save();
  }

  async findAll(args?: Pick<Room, 'status'>): Promise<Room[]> {
    return this.roomModel.find({ status: args.status }).exec();
  }

  async findOne(id: string): Promise<Room> {
    return this.roomModel.findById(id).exec();
  }

  async update(id: string, room: Partial<Room>): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(id, room, { new: true }).exec();
  }

  async remove(id: string): Promise<Room> {
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}
