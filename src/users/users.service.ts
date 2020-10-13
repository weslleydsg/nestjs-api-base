import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { TransformClassToPlain } from 'class-transformer';

import { UsersRepository } from './users.repository';
import { UserUpdateDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  @TransformClassToPlain()
  async update(id: string, data: UserUpdateDTO) {
    const entity = await this.usersRepository.findById(id);

    if (!entity) throw new BadRequestException('User does not exist.');

    const { actualPassword } = data;

    if (!(await entity.comparePassword(actualPassword)))
      throw new UnauthorizedException('actualPassword does not match.');

    await this.usersRepository.updateById(id, data);

    return this.usersRepository.findById(id);
  }

  async delete(id: string) {
    const exists = await this.usersRepository.findById(id);
    if (!exists) throw new BadRequestException('User does not exist.');

    await this.usersRepository.deleteById(id);
  }
}
