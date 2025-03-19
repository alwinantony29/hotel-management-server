import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { RoomBooking } from './roombookings.model';
import { EmailService } from 'src/shared/email.service';
import { differenceInDays } from 'date-fns';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class RoombookingsService {
  constructor(
    @InjectModel(RoomBooking)
    private readonly roomBookingModel: ReturnModelType<typeof RoomBooking>,
    private readonly emailService: EmailService,
    private readonly roomService: RoomsService,
  ) {}

  async create(
    userId: string,
    booking: Omit<RoomBooking, 'userId'>,
  ): Promise<RoomBooking> {
    const diff = differenceInDays(booking.to, booking.from);
    const room = await this.roomService.findOne(booking.roomId as any);

    const createdBooking = new this.roomBookingModel({
      userId,
      ...booking,
      totalPrice: room.price * (diff || 1),
    });

    await createdBooking.populate('roomId');
    await createdBooking.populate('userId');
    await createdBooking.save();

    await this.emailService.sentRoomBookedEmail(createdBooking);
    return createdBooking;
  }

  async findAll({ userId }: { userId?: string }): Promise<RoomBooking[]> {
    return this.roomBookingModel.find({ userId }).populate('roomId').exec();
  }

  async findOne(id: string): Promise<RoomBooking> {
    const booking = await this.roomBookingModel.findById(id).exec();
    if (booking) return booking;

    throw new NotFoundException(`Room booking with ID ${id} not found`);
  }

  async update(
    id: string,
    booking: Partial<RoomBooking>,
  ): Promise<RoomBooking> {
    const updatedBooking = await this.roomBookingModel
      .findByIdAndUpdate(id, booking, { new: true })
      .exec();
    if (!updatedBooking) {
      throw new NotFoundException(`Room booking with ID ${id} not found`);
    }
    return updatedBooking;
  }

  async remove(id: string): Promise<void> {
    const result = await this.roomBookingModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Room booking with ID ${id} not found`);
    }
  }
}
