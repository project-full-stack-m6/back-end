import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletsRepository } from './repository/wallets.repository';
import { WalletsPrismaRepository } from './repository/prisma/wallets.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersPrismaRepository } from '../users/repositories/prisma/users.prisma.repository';

@Module({
  controllers: [WalletsController],
  providers: [
    WalletsService,
    UsersService,
    PrismaService,
    { provide: WalletsRepository, useClass: WalletsPrismaRepository },
    { provide: UsersRepository, useClass: UsersPrismaRepository },
  ],
  exports: [WalletsService, UsersService],
})
export class WalletsModule {}
