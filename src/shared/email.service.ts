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
    Check-in Date: ${new Date(bookingDetails.from).toLocaleDateString()}
    Check-out Date: ${new Date(bookingDetails.to).toLocaleDateString()}
    Total Guests: ${bookingDetails.totalPeople}
    Booking Status: ${bookingDetails.status}
    Capacity: ${room.capacity} persons
    Total: ₹${bookingDetails.totalPrice}

    If you have any special requests or need further assistance, feel free to reach out to us. We look forward to making your stay comfortable and enjoyable!
    
    Best regards,
    ${HOTEL_NAME}
    Luxury & Comfort Redefined
    123 Ocean Drive, Miami, FL
    Email: contact@grandazure.com
    Phone: +1 (123) 456-7890
`;

    console.log('🚀 sending  mail...to:', user.email);

    await this.mailService.sendMail({
      from: `${HOTEL_NAME} <${process.env.EMAIL_USERNAME}>`,
      to: user.email,
      subject: `Your Hotel Room Booking Confirmation – ${HOTEL_NAME}`,
      text: message,
    });
    console.log('mail sent ✅');
  }

  async sentDriverOnboardingMail(driver: User & { rawPassword: string }) {
    const message = `Dear ${driver.name},
    
    Congratulations! You have been successfully onboarded as a driver at ${HOTEL_NAME}. To get started, please follow these steps:
    
     Log in to your account using 
     email: ${driver.email}  
     password: ${driver.rawPassword}
    
    Best regards,
    ${HOTEL_NAME}
    Luxury & Comfort Redefined
    123 Ocean Drive, Miami, FL
    Email: contact@grandazure.com
    Phone: +1 (123) 456-7890`;
    console.log('🚀 sending onboarding mail... to:', driver.email);

    await this.mailService.sendMail({
      from: `${HOTEL_NAME} <${process.env.EMAIL_USERNAME}>`,
      to: driver.email,
      subject: `Welcome aboard – ${HOTEL_NAME}`,
      text: message,
    });
    console.log('mail sent ✅');
  }
}
