import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CabbookingsModule } from './modules/cabbookings/cabbookings.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { RoombookingsModule } from './modules/roombookings/roombookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypegooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    RoomsModule,
    RoombookingsModule,
    CabbookingsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
