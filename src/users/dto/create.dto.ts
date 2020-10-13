import {
  Length,
  IsString,
  IsDefined,
  ValidateNested,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Match } from 'src/shared/decorators';
import { RoleDTO } from 'src/roles/dto';
import { Password } from '../users.entity';

export class UserDTO {
  @Length(5, 40)
  @IsString()
  @IsDefined()
  readonly password: Password;

  @Match('password')
  @Length(5, 40)
  @IsString()
  @IsDefined()
  readonly passwordConfirm: Password;

  @ValidateNested()
  @Type(() => RoleDTO)
  @IsArray()
  @IsOptional()
  readonly roles: RoleDTO[];
}
