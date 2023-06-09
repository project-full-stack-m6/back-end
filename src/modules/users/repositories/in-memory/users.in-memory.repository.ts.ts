import { users } from 'src/database/db';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { plainToInstance } from 'class-transformer';

export class UsersInMemoryRepository implements UsersRepository {
  create(data: CreateUserDto): Promise<User> | User {
    const user = new User();
    Object.assign(user, { ...data });

    users.push(user);
    return plainToInstance(User, user);
  }

  findAll(): Promise<User[]> | User[] {
    return plainToInstance(User, users);
  }

  findOne(userId): Promise<User> | User {
    const user = users.find((user) => user.id === userId);
    return plainToInstance(User, user);
  }

  findByEmail(email: string): User | Promise<User> {
    const user = users.find((user) => user.email === email);
    return plainToInstance(User, user);
  }

  update(id: number, data: UpdateUserDto): Promise<User> | User {
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = {
      ...users[userIndex],
      ...data,
    };

    return plainToInstance(User, userIndex);
  }

  delete(id: number): Promise<void> | void {
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);
  }
}
