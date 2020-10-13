import { IsString, IsNotEmpty, IsDefined, IsEmail } from 'class-validator';

import { Email } from 'src/people/people.entity';
import { Password } from 'src/users/users.entity';

export class LoginDTO {
  @IsEmail()
  @IsDefined()
  readonly login: Email;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  readonly password: Password;
}
