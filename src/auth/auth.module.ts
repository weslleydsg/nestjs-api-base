import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeopleRepository } from 'src/people/people.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesRepository } from 'src/roles/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleRepository, RolesRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
