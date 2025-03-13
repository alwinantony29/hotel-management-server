import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { RoomBooking } from './roombookings.model';
import { EmailService } from 'src/shared/email.service';

@Injectable()
export class RoombookingsService {
  constructor(
    @InjectModel(RoomBooking)
    private readonly roomBookingModel: ReturnModelType<typeof RoomBooking>,
    private readonly emailService: EmailService,
  ) {}

  async create(booking: Partial<RoomBooking>): Promise<RoomBooking> {
    const createdBooking = new this.roomBookingModel(booking);
    await createdBooking.save();
    await this.emailService.sentRoomBookedEmail();
    return createdBooking;
  }

  async findAll(): Promise<RoomBooking[]> {
    return this.roomBookingModel.find().exec();
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
