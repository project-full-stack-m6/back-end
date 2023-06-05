import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';

@Module({
  imports: [UsersModule, WalletsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
