import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from 'src/users/users.repository';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import NotificationSchema from './notifications.model';
import { NotificationsRepository } from './notifications.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
    ]),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsRepository],
})
export class NotificationsModule {}
