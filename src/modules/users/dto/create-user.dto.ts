import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsEmpty,
  IsNotEmpty,
  IsBoolean,
  MinLength,
  validate,
  Matches,
  isEmpty,
  IsObject,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Transform(({ value }: { value: string }) => hashSync(value), {
    groups: ['transform'],
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  // @Matches('(\\(?\\d{2}\\)?\\s)(\\d{4,5}\\-?\\d{4})')
  phone: string;

  @IsOptional()
  @IsBoolean()
  is_staff?: boolean;

  @IsOptional()
  @IsBoolean()
  is_admin?: boolean;
}
