import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Exclude, Expose } from 'class-transformer';

import authConfig from '../config/auth';
import { ColumnsBaseEntity, EntityInfos } from '../shared/base.entity';
import { Role } from '../roles/roles.entity';

export type Password = string;

const entity = 'users';

@Entity(entity)
export class User extends ColumnsBaseEntity implements EntityInfos {
  @Expose()
  get infos() {
    return { type: entity };
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column()
  password: Password;

  @ManyToMany(() => Role, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'role_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_name',
      referencedColumnName: 'name',
    },
  })
  roles: Role[];

  token?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 8);
  }

  sign() {
    const { id, roles } = this;
    this.token = jwt.sign({ id, roles }, authConfig.secret, authConfig.options);
  }

  async comparePassword(attempt: Password) {
    return bcrypt.compare(attempt, this.password);
  }
}
