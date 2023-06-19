import { User } from 'src/modules/users/entities/user.entity';
import { Wallet } from '../../entities/wallet.entity';
import { WalletsRepository } from '../wallets.repository';

export class WalletsInMemoryRepository implements WalletsRepository {
  private wallets: Wallet[] = [];
  private users: User[] = [];
  create(userEmail: string, userId: number): Wallet | Promise<Wallet> {
    const wallet = this.wallets.find((wallet) => wallet.user_id === userId);

    const user = this.users.find((user) => user.email === userEmail);

    if (!wallet) {
      const newWallet = new Wallet();
      Object.assign(newWallet, { user_id: userId });

      newWallet.contacts = [...newWallet.contacts, user];

      this.wallets.push(newWallet);

      return newWallet;
    }

    wallet.contacts = [...wallet.contacts, user];

    return wallet;
  }

  findWallet(userId: number): Wallet | Promise<Wallet> {
    const wallet = this.wallets.find((wallet) => wallet.user_id === userId);

    return wallet;
  }

  delete(userId, contactId): Wallet {
    const wallet = this.wallets.find((wallet) => wallet.user_id === userId);

    const newContacts = wallet.contacts.filter((user) => user.id !== contactId);

    wallet.contacts = newContacts;

    return wallet;
  }
}
