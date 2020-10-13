import { Injectable, BadRequestException, Query } from '@nestjs/common';

import { UsersRepository } from 'src/users/users.repository';
import { NotificationDTO, NotificationQueryDTO } from './dto';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async listUserNotifications(
    user: string,
    @Query() query: NotificationQueryDTO,
  ) {
    const queryObject = new NotificationQueryDTO(query, true);

    const count = await this.notificationsRepository.countAllByUser(user);

    return {
      queryObject,
      data: await this.notificationsRepository.findAllByUser(user, queryObject),
      actualPage: Number(queryObject.page.number),
      totalPages: Math.ceil(count / Number(queryObject.page.size)),
    };
  }

  async view(id: string, user: string) {
    const notification = await this.notificationsRepository.findByIdAndUser(
      id,
      user,
    );

    if (!notification)
      throw new BadRequestException('Notification does not exist.');

    return notification;
  }

  async create(data: NotificationDTO) {
    const { user } = data;

    if (!(await this.usersRepository.findById(user)))
      throw new BadRequestException('User does not exist.');

    return this.notificationsRepository.save(data);
  }

  async update(id: string) {
    const notification = await this.notificationsRepository.updateById(id);

    if (!notification)
      throw new BadRequestException('Notification does not exist.');

    return notification;
  }
}
