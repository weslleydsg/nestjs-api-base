import { Entity, Column, Unique, OneToOne, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Columns, EntityInfos } from '../shared/base.entity';
import { User } from '../users/users.entity';

export type Email = string;

const entity = 'people';

@Entity(entity)
@Unique(['email'])
export class Person extends Columns implements EntityInfos {
  @Expose()
  get infos() {
    return { type: entity };
  }

  @OneToOne(() => User, {
    primary: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User = new User();

  @Column({ length: 320 })
  email: Email;

  @Column({ name: 'first_name', length: 60 })
  firstName: string;

  @Column({ name: 'last_name', length: 60 })
  lastName: string;

  @Expose()
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
