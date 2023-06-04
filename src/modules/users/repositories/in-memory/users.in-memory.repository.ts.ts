import { users } from 'src/database/db';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';

export class UsersInMemoryRepository implements UsersRepository {
  create(data: CreateUserDto): Promise<User> | User {
    const newUser = new User();
    Object.assign(newUser, { ...data });
    users.push(newUser);
    return newUser;
  }

  // findAll(): Promise<User[]> {}

  // findOne(): Promise<User> {}
  // delete(): Promise<void> {}
  // update(data: UpdateUserDto): Promise<User> {}
}
