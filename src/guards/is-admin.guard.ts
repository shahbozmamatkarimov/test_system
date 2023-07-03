import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.user.role.length == 1) {
      if (req.user.role[0].name != 'admin') {
        throw new UnauthorizedException(
          "Foydalanuvchida adminlik huquqi yo'q!",
        );
      }
    } else if (req.user.role.length > 1) {
      for (let i of req.user.role) {
        if (i.name == 'admin') {
          return true;
        }
      }
      throw new UnauthorizedException("Foydalanuvchida adminlik huquqi yo'q!");
    }
    return true;
  }
}
