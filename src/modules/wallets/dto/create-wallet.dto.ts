import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  contacts: number[] | [];
}
