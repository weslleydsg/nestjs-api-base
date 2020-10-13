import { Length, IsString, ValidateIf, IsDefined } from 'class-validator';

import { Match } from 'src/shared/decorators';
import { Password } from '../users.entity';

export class UserUpdateDTO {
  @Length(5, 40)
  @IsString()
  @ValidateIf(e => e.password !== undefined || e.passwordConfirm !== undefined)
  readonly password: Password;

  @Match('password')
  @Length(5, 40)
  @IsString()
  @ValidateIf(e => e.password !== undefined || e.passwordConfirm !== undefined)
  readonly passwordConfirm: Password;

  @IsString()
  @IsDefined()
  readonly actualPassword: Password;
}
