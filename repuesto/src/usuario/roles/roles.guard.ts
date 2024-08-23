import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../rol.enum';
import { ROLES_KEY } from '../decorators';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const Rolexiste =requiredRoles.some((role) => user.roles?.includes(role))
    if(!Rolexiste) {  
      throw new HttpException (
        'No tienes permisos para realizar esta accion',
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    return Rolexiste ;
  }
}
