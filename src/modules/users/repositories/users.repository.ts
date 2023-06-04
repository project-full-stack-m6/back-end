import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User> | User;
  //   abstract update(data: UpdateUserDto): Promise<User> | User;
  //   abstract findAll(): Promise<User[]> | User[];
  //   abstract findOne(): Promise<User> | User;
  //   abstract delete(): Promise<void> | void;
}
