import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class StaffGuard implements CanActivate {
  constructor(private usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const findUser = await this.usersRepository.findByEmail(user.email);

    if (findUser.is_staff) {
      return true;
    }

    throw new ForbiddenException('Apenas vendedores podem acessar esta rota.');
  }
}
