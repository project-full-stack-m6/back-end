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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { AdminGuard } from '../auth/is_admin-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Request() req) {
    const userId = parseInt(req.user.id);
    return this.usersService.findOne(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = parseInt(id);
    const reqId = parseInt(req.user.id);
    return this.usersService.update(userId, updateUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateMyUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = parseInt(req.user.id);
    return this.usersService.updateMyUser(userId, updateUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    const userId = parseInt(id);
    return this.usersService.delete(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteMyUser(@Request() req) {
    const userId = parseInt(req.user.id);
    return this.usersService.deleteMyUser(userId);
  }
}
