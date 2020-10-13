import { Repository, EntityRepository, DeepPartial } from 'typeorm';

import { User } from './users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }

  async updateById(id: string, data: DeepPartial<User>) {
    const entity = this.create(data);

    if (Object.keys(entity).length === 0) return;

    const { affected } = await this.update({ id }, entity);
    return affected == 1;
  }

  async deleteById(id: string) {
    await this.delete({ id });
  }
}
