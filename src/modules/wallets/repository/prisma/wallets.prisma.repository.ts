import { User } from 'src/modules/users/entities/user.entity';
import { CreateWalletDto } from '../../dto/create-wallet.dto';
import { Wallet } from '../../entities/wallet.entity';
import { WalletsRepository } from '../wallets.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

export class WalletsPrismaRepository implements WalletsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    createWalletDto: CreateWalletDto,
    userId: number,
  ): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { user_id: userId },
      include: { contacts: true },
    });

    const user = await this.prisma.user.findUnique({
      where: { email: createWalletDto.email },
    });

    if (!wallet) {
      const newWallet = new Wallet();
      Object.assign(newWallet, {
        user_id: user.id,
      });

      const createWallet = await this.prisma.wallet.create({
        data: { id: newWallet.id, user_id: user.id },
        include: { contacts: true },
      });

      const update = await this.prisma.wallet.update({
        where: { user_id: userId },
        data: { contacts: { set: [...createWallet.contacts, user] } },
      });

      return update;
    }

    const update = await this.prisma.wallet.update({
      where: { user_id: userId },
      data: { contacts: { set: [...wallet.contacts, user] } },
    });

    return update;
  }

  findWallet(userId: number): Wallet | Promise<Wallet> {
    const wallet = this.prisma.wallet.findUnique({ where: { id: userId } });

    return wallet;
  }
}
