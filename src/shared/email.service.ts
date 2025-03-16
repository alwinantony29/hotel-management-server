import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RoomBooking } from 'src/modules/roombookings/roombookings.model';
import { Room } from 'src/modules/rooms/rooms.model';
import { User } from 'src/modules/users/user.model';

const HOTEL_NAME = 'Grand Azure';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}
  async sentRoomBookedEmail(bookingDetails: RoomBooking) {
    const user = bookingDetails.userId as User;
    const room = bookingDetails.roomId as Room;

    const message = `Dear ${user.name},
    
    Thank you for choosing ${HOTEL_NAME}! Your booking has been successfully confirmed. Here are the details of your reservation:
    
    Booking Details:
    Room Type: ${room.type}
    Room Number: ${room.roomNo}
    Check-in Date: ${bookingDetails.from}
    Check-out Date: ${bookingDetails.to}
    Total Guests: ${bookingDetails.totalPeople}
    Payment Status: ${bookingDetails.isPaid ? 'Paid' : 'Unpaid'}
    Booking Status: ${bookingDetails.status}
    Capacity: ${room.capacity} persons
    Price per night: $ ${room.price}
    If you have any special requests or need further assistance, feel free to reach out to us. We look forward to making your stay comfortable and enjoyable!
    
    Best regards,
    ${HOTEL_NAME}
    [Hotel Contact Information]
    [Hotel Address]`;

    console.log('🚀 sending  mail...');

    await this.mailService.sendMail({
      from: `${HOTEL_NAME} <${process.env.EMAIL_USERNAME}>`,
      to: 'alwin@helloastral.com',
      subject: `Your Hotel Room Booking Confirmation – ${HOTEL_NAME}`,
      text: message,
    });
    console.log('mail sent ✅');
  }
}
