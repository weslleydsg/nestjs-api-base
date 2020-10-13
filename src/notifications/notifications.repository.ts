import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Notification } from './notifications.model';
import { NotificationDTO, NotificationQueryDTO } from './dto';

export class NotificationsRepository {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
  ) {}

  async save(data: Notification | NotificationDTO) {
    return new this.notificationModel(data).save();
  }

  async findAllByUser(user: string, options: NotificationQueryDTO) {
    const { page, order } = options;

    const sizeNumber = Number(page.size);

    return this.notificationModel
      .find({ user })
      .sort(order)
      .limit(sizeNumber)
      .skip(sizeNumber * (Number(page.number) - 1))
      .exec();
  }

  async countAllByUser(user: string) {
    return this.notificationModel
      .find({ user })
      .countDocuments()
      .exec();
  }

  async findByIdAndUser(_id: string, user: string) {
    try {
      const notification = await this.notificationModel
        .findOne({ _id, user })
        .exec();
      return notification;
    } catch {}
  }

  async updateById(id: string) {
    return this.notificationModel
      .findByIdAndUpdate(id, { read: true }, { new: true })
      .exec();
  }
}
