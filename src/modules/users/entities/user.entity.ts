export class User {
  readonly id: number;
  email: string;
  name: string;
  password: string;
  phone: string;
  register_date: string;
  is_staff: boolean;

  wallet_id?: number;
}
