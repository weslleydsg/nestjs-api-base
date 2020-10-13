import {
  IsDefined,
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { PermissionNames } from '../enums';

export class PermissionDTO {
  @IsEnum(PermissionNames, {
    message: 'name must be a valid PermissionNames',
  })
  @IsString()
  @IsDefined()
  name: PermissionNames;

  @MaxLength(500)
  @IsString()
  @IsOptional()
  description: string;
}
