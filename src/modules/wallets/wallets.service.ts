import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletsRepository } from './repository/wallets.repository';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class WalletsService {
  constructor(
    private walletsRepository: WalletsRepository,
    private usersRepository: UsersRepository,
  ) {}
  async create(userEmail: string, userId: number) {
    const findUser = await this.usersRepository.findByEmail(userEmail);

    if (!findUser) {
      throw new NotFoundException({ message: 'User not found' });
    } else if (findUser.id === userId) {
      throw new ConflictException({
        message: 'Você não pode adicionar a si mesmo',
      });
    }
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
