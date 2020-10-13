import { Injectable, BadRequestException } from '@nestjs/common';
import { TransformClassToPlain } from 'class-transformer';

import { PeopleRepository } from './people.repository';
import { PersonUpdateDTO } from './dto';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  @TransformClassToPlain()
  async view(userId: string) {
    const entity = await this.peopleRepository.findByUserId(userId);

    if (!entity) throw new BadRequestException('Person does not exist.');

    return entity;
  }

  @TransformClassToPlain()
  async update(userId: string, data: PersonUpdateDTO) {
    const entity = await this.peopleRepository.findByUserId(userId);

    if (!entity) throw new BadRequestException('Person does not exist.');

    const { email } = data;
    if (
      email &&
      email !== entity.email &&
      (await this.peopleRepository.emailExists(email))
    )
      throw new BadRequestException('Email already exists.');

    await this.peopleRepository.updateByUserId(userId, data);

    return this.peopleRepository.findByUserId(userId);
  }
}
