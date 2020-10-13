import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Expose } from 'class-transformer';

import { EntityInfos } from 'src/shared/base.entity';
import { RoleNames } from './enums';
import { Permission } from '../permissions/permissions.entity';

const entity = 'roles';

@Entity(entity)
export class Role implements EntityInfos {
  @Expose()
  get infos() {
    return { type: entity };
  }

  @PrimaryColumn({ length: 20 })
  name: RoleNames;

  @Column({ length: 500 })
  description: string;

  @ManyToMany(() => Permission, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'permission_role',
    joinColumn: {
      name: 'role_name',
      referencedColumnName: 'name',
    },
    inverseJoinColumn: {
      name: 'permission_name',
      referencedColumnName: 'name',
    },
  })
  permissions: Permission[];
}
