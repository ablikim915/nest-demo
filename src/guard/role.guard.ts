import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly Reflector: Reflector) {}

  // canActivate() 方法是 `CanActivate` 接口的实现方法，它接收一个 `ExecutionContext` 参数，
  // 并返回一个布尔值、Promise 或 Observable，用于指示路由是否可以被激活
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    // 从 Reflector 服务中获取具有 `role` 属性的元数据
    const admin = this.Reflector.get<string[]>('role', context.getHandler());
    
    // 从执行上下文中获取 HTTP 请求对象，并将其转换为 Express 请求对象
    const req = context.switchToHttp().getRequest<Request>(); 
    
    // 检查请求的角色是否与 `admin` 变量中的任何角色匹配
    if (admin && admin.includes(req.query.role as string)) {
      return true;
    }
    
    // 如果请求的角色与 `admin` 变量中的任何角色都不匹配，则返回 false
    return false;
  }
}
