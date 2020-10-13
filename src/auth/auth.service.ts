import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { PeopleRepository } from 'src/people/people.repository';
import { RolesRepository } from 'src/roles/roles.repository';
import { RoleNames } from 'src/roles/enums';
import { LoginDTO, RegisterDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async login(data: LoginDTO) {
    const { login, password } = data;

    const result = await this.peopleRepository.findByEmail(login);

    if (!result) throw new BadRequestException('Person does not exist.');

    if (!(await result.user.comparePassword(password)))
      throw new UnauthorizedException('Password does not match.');

    result.user.sign();
    return result;
  }

  async register(data: RegisterDTO) {
    if (await this.peopleRepository.emailExists(data.email))
      throw new BadRequestException('Email already exists');

    const entity = this.peopleRepository.create(data);

    if (entity.user.roles) {
      const roles = [];
      for (const role of data.user.roles)
        roles.push(await this.rolesRepository.findByName(role.name));
      entity.user.roles = roles;
    } else
      entity.user.roles = [
        await this.rolesRepository.findByName(RoleNames.USER),
      ];

    const createdEntity = await this.peopleRepository.saveEntity(entity);

    createdEntity.user.sign();
    return createdEntity;
  }
}
