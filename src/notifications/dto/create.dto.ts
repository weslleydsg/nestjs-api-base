import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class NotificationDTO {
  @MaxLength(40)
  @IsNotEmpty()
  @IsString()
  title: string;

  @MaxLength(500)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content: string;

  @IsUUID()
  user: string;
}
