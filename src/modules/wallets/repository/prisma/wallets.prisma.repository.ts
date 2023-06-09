import { Wallet } from '../../entities/wallet.entity';
import { WalletsRepository } from '../wallets.repository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletsPrismaRepository implements WalletsRepository {
  constructor(private prisma: PrismaService) {}

  async create(userEmail: string, userId: number): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { user_id: userId },
      include: { contacts: true },
    });

    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!wallet || wallet === null) {
      const newWallet = new Wallet();
      Object.assign(newWallet, {
        user_id: userId,
      });

      const createWallet = await this.prisma.wallet.create({
        data: { user_id: userId },
        include: { contacts: true },
      });

      const update = await this.prisma.wallet.update({
        where: { id: createWallet.id },
        data: { contacts: { connect: { id: user.id } } },
        include: { contacts: true },
      });

      return update;
    }

    const update = await this.prisma.wallet.update({
      where: { user_id: userId },
      data: { contacts: { connect: { id: user.id } } },
      include: { contacts: true },
    });

    return update;
  }

  async findWallet(userId: number): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: userId },
      include: { contacts: true },
    });

    return wallet;
  }

  async delete(userId, contactId): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { user_id: userId },
      include: { contacts: true },
    });

    const newWallet = await this.prisma.wallet.update({
      where: { id: wallet.id },
      data: { contacts: { disconnect: { id: contactId } } },
      include: { contacts: true },
    });

    return newWallet;
  }
}
