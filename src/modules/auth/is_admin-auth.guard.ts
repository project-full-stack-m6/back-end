import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const findUser = await this.usersRepository.findByEmail(user.email);

    if (findUser.is_admin) {
      return true;
    }

    throw new ForbiddenException(
      'Apenas administradores podem acessar esta rota.',
    );
  }
}
