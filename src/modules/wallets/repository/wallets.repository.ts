import { CreateWalletDto } from '../dto/create-wallet.dto';
import { Wallet } from '../entities/wallet.entity';

export abstract class WalletsRepository {
  abstract create(
    createWalletDto: CreateWalletDto,
    userId: number,
  ): Promise<Wallet> | Wallet;

  abstract findWallet(userId: number): Promise<Wallet> | Wallet;
}
