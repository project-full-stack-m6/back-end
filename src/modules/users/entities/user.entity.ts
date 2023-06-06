import { Exclude } from 'class-transformer';

export class User {
  readonly id: number;
  email: string;
  name: string;

  @Exclude()
  password: string;
  phone: string;
  readonly created_at: Date;
  is_staff: boolean;

  wallet_id?: number;
}
