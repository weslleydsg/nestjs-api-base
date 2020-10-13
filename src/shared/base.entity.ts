import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export { BaseEntity };

interface BaseColumns {
  createdAt: Date;
  updatedAt: Date;
}

export class Columns implements BaseColumns {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export class ColumnsBaseEntity extends BaseEntity implements BaseColumns {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export interface Infos {
  type: string;
}

export class EntityInfos {
  infos: Infos;
}
