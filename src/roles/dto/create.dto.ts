import {
  IsDefined,
  IsString,
  IsEnum,
  MaxLength,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

import { RoleNames } from '../enums';
import { PermissionDTO } from 'src/permissions/dto';

export class RoleDTO {
  @IsEnum(RoleNames, {
    message: 'name must be a valid RoleNames',
  })
  @IsString()
  @IsDefined()
  name: RoleNames;

  @MaxLength(500)
  @IsString()
  @IsOptional()
  description: string;

  @ValidateNested()
  @Type(() => PermissionDTO)
  @IsArray()
  @IsOptional()
  readonly permissions: PermissionDTO[];
}
