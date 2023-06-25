import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, { ...data });
    const newUser = await this.prisma.user.create({
      data: { ...user },
      include: { my_wallet: true },
    });
    return plainToInstance(User, newUser);
  }

  async findAll(): Promise<User[]> {
    const user = await this.prisma.user.findMany();
    return plainToInstance(User, user);
  }

  async findOne(userId): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        my_wallet: { include: { contacts: true } },
        wallets_client: { include: { user: true } },
      },
    });
    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    return user;
  }

  async update(userId: number, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...data },
    });

    return plainToInstance(User, user);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id: id } });
  }
}
