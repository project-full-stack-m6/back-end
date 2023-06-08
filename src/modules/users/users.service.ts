import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (findUser) {
      throw new ConflictException({ message: 'Email already exist' });
    }

    return await this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(userId: number) {
    return await this.usersRepository.findOne(userId);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async update(userId: number, email: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOne(userId);

    if (!findUser) {
      throw new NotFoundException({ message: 'User not found' });
    }
    return await this.usersRepository.update(userId, updateUserDto);
  }

  async remove(id: number) {
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) {
      throw new NotFoundException({ message: 'User not found' });
    }
    return await this.usersRepository.delete(id);
  }

  async validateStaff(email: string) {
    const findAdmin = await this.usersRepository.findByEmail(email);

    if (!findAdmin.is_staff) {
      throw new UnauthorizedException({ message: 'Não autorizado' });
    }
  }
}
