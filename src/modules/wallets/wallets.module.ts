import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletsRepository } from './repository/wallets.repository';
import { WalletsPrismaRepository } from './repository/prisma/wallets.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [WalletsController],
  providers: [
    WalletsService,
    PrismaService,
    { provide: WalletsRepository, useClass: WalletsPrismaRepository },
  ],
  exports: [WalletsService],
})
export class WalletsModule {}
