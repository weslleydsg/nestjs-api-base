import { Controller, UseGuards, Get, Patch, Body } from '@nestjs/common';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { LoggedUser } from 'src/users/decorators';
import { JsonApi } from 'src/shared/interceptors/response.interceptor';
import { PeopleService } from './people.service';
import { PersonUpdateDTO } from './dto';

@Controller('people')
@UseGuards(AuthGuard)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async view(@LoggedUser('id') loggedUserId: string): Promise<JsonApi> {
    return {
      data: await this.peopleService.view(loggedUserId),
    };
  }

  @Patch()
  async update(
    @LoggedUser('id') loggedUserId: string,
    @Body() data: PersonUpdateDTO,
  ): Promise<JsonApi> {
    return { data: await this.peopleService.update(loggedUserId, data) };
  }
}
