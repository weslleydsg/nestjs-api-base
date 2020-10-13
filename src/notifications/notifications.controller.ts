import {
  Controller,
  Body,
  Get,
  Post,
  UseGuards,
  Patch,
  Param,
  Query,
} from '@nestjs/common';

import { LoggedUser } from 'src/users/decorators';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { Roles } from 'src/roles/decorators';
import { Permissions } from 'src/permissions/decorators';
import { RoleNames } from 'src/roles/enums';
import { PermissionNames } from 'src/permissions/enums';
import { JsonApi } from 'src/shared/interceptors/response.interceptor';
import { NotificationsService } from './notifications.service';
import { NotificationDTO, NotificationQueryDTO } from './dto';

@Controller('notifications')
@UseGuards(AuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @Roles(RoleNames.USER)
  async list(
    @LoggedUser('id') loggedUserId: string,
    @Query() query: NotificationQueryDTO,
  ): Promise<JsonApi> {
    const {
      queryObject,
      data,
      actualPage,
      totalPages,
    } = await this.notificationsService.listUserNotifications(
      loggedUserId,
      query,
    );

    return {
      queryObject,
      meta: { totalPages, actualPage },
      listData: data.map(notification => notification.toJSON()),
      showLinks: true,
    };
  }

  @Get(':id')
  @Roles(RoleNames.USER)
  async view(
    @LoggedUser('id') loggedUserId: string,
    @Param('id') id: string,
  ): Promise<JsonApi> {
    return {
      data: (await this.notificationsService.view(id, loggedUserId)).toJSON(),
    };
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionNames.MASTER)
  async create(@Body() data: NotificationDTO): Promise<JsonApi> {
    return { data: (await this.notificationsService.create(data)).toJSON() };
  }

  @Patch(':id')
  @Roles(RoleNames.USER)
  async update(@Param('id') id: string): Promise<JsonApi> {
    return { data: (await this.notificationsService.update(id)).toJSON() };
  }
}
