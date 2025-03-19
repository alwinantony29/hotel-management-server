import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CabBooking } from './cabbookings.model';

@Injectable()
export class CabbookingsService {
  constructor(
    @InjectModel(CabBooking)
    private readonly cabBookingModel: ReturnModelType<typeof CabBooking>,
  ) {}

  async create(createCabBookingDto: Partial<CabBooking>): Promise<CabBooking> {
    const createdBooking = new this.cabBookingModel(createCabBookingDto);
    return createdBooking.save();
  }

  async findAll(): Promise<CabBooking[]> {
    return this.cabBookingModel.find().populate('roomId').exec();
  }

  async findOne(id: string): Promise<CabBooking> {
    const booking = await this.cabBookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Cab booking #${id} not found`);
    }
    return booking;
  }

  async update(
    id: string,
    updateCabBookingDto: Partial<CabBooking>,
  ): Promise<CabBooking> {
    const updatedBooking = await this.cabBookingModel
      .findByIdAndUpdate(id, updateCabBookingDto, { new: true })
      .exec();
    if (!updatedBooking) {
      throw new NotFoundException(`Cab booking #${id} not found`);
    }
    return updatedBooking;
  }

  async remove(id: string): Promise<void> {
    const result = await this.cabBookingModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Cab booking #${id} not found`);
    }
  }

  async findByUserId(userId: string): Promise<CabBooking[]> {
    return this.cabBookingModel.find({ userId }).exec();
  }

  async findByDriverId(driverId: string): Promise<CabBooking[]> {
    return this.cabBookingModel.find({ driverId }).exec();
  }
}
