import { Injectable } from '@nestjs/common';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletsRepository } from './repository/wallets.repository';

@Injectable()
export class WalletsService {
  constructor(private walletsRepository: WalletsRepository) {}
  create(userEmail: string, userId: number) {
    return this.walletsRepository.create(userEmail, userId);
  }

  findWallet(userId: number) {
    return this.walletsRepository.findWallet(userId);
  }

  findAll() {
    return `This action returns all wallets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
