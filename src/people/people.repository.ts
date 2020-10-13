import { Repository, EntityRepository, DeepPartial } from 'typeorm';

import { Person, Email } from './people.entity';
import { PersonDTO } from './dto';

@EntityRepository(Person)
export class PeopleRepository extends Repository<Person> {
  async saveEntity(data: Person | PersonDTO) {
    const entity = this.create(data);

    return this.save(entity);
  }

  async findByUserId(userId: string) {
    return this.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findByEmail(email: Email) {
    return this.createQueryBuilder('people')
      .where('LOWER(people.email) = LOWER(:email)', { email })
      .innerJoinAndSelect('people.user', 'user')
      .innerJoinAndSelect('user.roles', 'roles')
      .innerJoinAndSelect('roles.permissions', 'permissions')
      .getOne();
  }

  async updateByUserId(userId: string, data: DeepPartial<Person>) {
    const entity = this.create(data);
    entity.user.id = userId;

    const { affected } = await this.update({ user: { id: userId } }, entity);
    return affected == 1;
  }

  async emailExists(email: Email) {
    return Boolean(
      await this.createQueryBuilder('people')
        .where('LOWER(people.email) = LOWER(:email)', { email })
        .getOne(),
    );
  }
}
