import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDto {
  email: string;

  contacts: number[] | [];
}
