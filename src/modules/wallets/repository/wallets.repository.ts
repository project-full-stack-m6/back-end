import { Wallet } from '../entities/wallet.entity';

export abstract class WalletsRepository {
  abstract create(userEmail: string, userId: number): Promise<Wallet> | Wallet;
  abstract delete(userId: number, contactId: number): Promise<Wallet> | Wallet;

  abstract findWallet(userId: number): Promise<Wallet> | Wallet;
}
