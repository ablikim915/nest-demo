import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.Reflector.get<string[]>('role', context.getHandler()) // 获取首位role的值
    const req = context.switchToHttp().getRequest<Request>() // 获取请求实例

    if (admin.includes(req.query.role as string)) {
      return true
    } 
    return false
  }
}
