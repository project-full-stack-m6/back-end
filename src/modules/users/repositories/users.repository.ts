import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User> | User;
  abstract update(id: number, data: UpdateUserDto): Promise<User> | User;
  abstract findAll(): Promise<User[]> | User[];
  abstract findOne(userId: number): Promise<User> | User;
  abstract findByEmail(email: string): Promise<User> | User;
  abstract delete(id: number): Promise<void> | void;
}
