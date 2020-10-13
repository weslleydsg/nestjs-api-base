import { Column, PrimaryColumn, Entity } from 'typeorm';
import { Expose } from 'class-transformer';

import { EntityInfos } from 'src/shared/base.entity';
import { PermissionNames } from './enums';

const entity = 'permissions';

@Entity(entity)
export class Permission implements EntityInfos {
  @Expose()
  get infos() {
    return { type: entity };
  }

  @PrimaryColumn({ length: 20 })
  name: PermissionNames;

  @Column({ length: 500 })
  description: string;
}
