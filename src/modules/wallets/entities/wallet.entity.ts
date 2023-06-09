import { User } from 'src/modules/users/entities/user.entity';

export class Wallet {
  readonly id: number;

  user_id: number;

  contacts?: User[];
  user?: number;
}
