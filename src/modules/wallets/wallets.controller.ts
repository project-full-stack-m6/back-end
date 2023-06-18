import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { StaffGuard } from '../auth/is_staff-auth.guard';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, StaffGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Request() req, @Body() createWalletDto: CreateWalletDto) {
    const userId: number = parseInt(req.user.id);
    const userEmail = createWalletDto.email;

    return await this.walletsService.create(userEmail, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, StaffGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(@Request() req, @Param() param) {
    const userId: number = parseInt(req.user.id);
    const contactId: number = parseInt(param.id);

    return await this.walletsService.delete(userId, contactId);
  }
}
