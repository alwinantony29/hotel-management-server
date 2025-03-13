import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}
  async sentRoomBookedEmail() {
    const message = `Dear [User's Name],
    
    Thank you for choosing [Hotel Name]! Your booking has been successfully confirmed. Here are the details of your reservation:
    
    Booking Details:
    Room Type: [deluxe/premium/ultra luxury]
    Room Number: [Room No]
    Check-in Date: [From Date]
    Check-out Date: [To Date]
    Total Guests: [Total People]
    Payment Status: [Paid/Unpaid]
    Booking Status: Confirmed
    Room Information:
    Capacity: [Room Capacity] persons
    Description: [Brief description of the room]
    Price per night: $[Room Price]
    If you have any special requests or need further assistance, feel free to reach out to us. We look forward to making your stay comfortable and enjoyable!
    
    Best regards,
    [Hotel Name]
    [Hotel Contact Information]
    [Hotel Address]`;

    console.log('🚀 sending  mail');

    await this.mailService.sendMail({
      from: `Kingsley Okure <${process.env.EMAIL_USERNAME}>`,
      to: 'alwin@helloastral.com',
      subject: `Your Hotel Room Booking Confirmation – [Hotel Name]`,
      text: message,
    });
    console.log('mail sent ✅');
  }
}
