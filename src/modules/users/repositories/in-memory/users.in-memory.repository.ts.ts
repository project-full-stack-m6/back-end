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

    const newUser = users.push(user);
    return plainToInstance(User, newUser);
  }

  findAll(): Promise<User[]> | User[] {
    return plainToInstance(User, users);
  }

  findOne(id: string): Promise<User> | User {
    const user = users.find((user) => user.id === parseInt(id));
    return plainToInstance(User, user);
  }

  findByEmail(email: string): User | Promise<User> {
    const user = users.find((user) => user.email === email);
    return plainToInstance(User, user);
  }

  update(id: string, data: UpdateUserDto): Promise<User> | User {
    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    users[userIndex] = {
      ...users[userIndex],
      ...data,
    };

    return plainToInstance(User, userIndex);
  }

  delete(id: string): Promise<void> | void {
    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    users.splice(userIndex, 1);
  }
}
