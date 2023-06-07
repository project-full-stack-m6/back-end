import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() user) {
    return this.authService.login(user.email);
  }
}