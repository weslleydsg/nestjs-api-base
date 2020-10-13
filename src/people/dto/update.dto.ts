import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsString,
  IsOptional,
} from 'class-validator';

import { Email } from 'src/people/people.entity';

export class PersonUpdateDTO {
  @IsEmail()
  @IsOptional()
  readonly email: Email;

  @MaxLength(60)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @MaxLength(60)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly lastName: string;
}
