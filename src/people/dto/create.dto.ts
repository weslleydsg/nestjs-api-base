import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  IsString,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';

import { UserDTO } from 'src/users/dto';
import { Email } from 'src/people/people.entity';

export class PersonDTO {
  @ValidateNested()
  @Type(() => UserDTO)
  @IsDefined()
  readonly user: UserDTO;

  @IsEmail()
  @IsDefined()
  readonly email: Email;

  @MaxLength(60)
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  readonly firstName: string;

  @MaxLength(60)
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  readonly lastName: string;
}
