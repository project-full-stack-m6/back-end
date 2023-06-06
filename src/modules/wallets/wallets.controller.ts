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
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { UsersService } from '../users/users.service';
import { NotFoundException } from '@nestjs/common/exceptions';

@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Request() req, @Body() createWalletDto: CreateWalletDto) {
    const userId: number = parseInt(req.user.id);
    const userEmail = createWalletDto.email;

    const findUser = await this.usersService.findByEmail(userEmail);

    if (!findUser) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return await this.walletsService.create(userEmail, userId);
  }

  // @Get()
  // findAll() {
  //   return this.walletsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id);
  }
}
