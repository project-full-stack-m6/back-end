import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsBoolean,
  MinLength,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Transform(({ value }: { value: string }) => hashSync(value), {
    groups: ['transform'],
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  // @Matches('(\\(?\\d{2}\\)?\\s)(\\d{4,5}\\-?\\d{4})')
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_staff?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_admin?: boolean;
}
