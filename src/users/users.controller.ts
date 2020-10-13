import {
  Controller,
  Patch,
  Delete,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UsersService } from './users.service';
import { LoggedUser } from './decorators';
import { UserUpdateDTO } from './dto';
import { JsonApi } from 'src/shared/interceptors/response.interceptor';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  async update(
    @LoggedUser('id') loggedUserId: string,
    @Body() data: UserUpdateDTO,
  ): Promise<JsonApi> {
    return { data: await this.usersService.update(loggedUserId, data) };
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@LoggedUser('id') loggedUserId: string) {
    return this.usersService.delete(loggedUserId);
  }
}
