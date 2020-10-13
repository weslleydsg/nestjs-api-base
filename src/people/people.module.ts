import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeopleRepository } from './people.repository';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleRepository])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
