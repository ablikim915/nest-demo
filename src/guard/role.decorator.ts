import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express'

// 方法装饰器
export const Role = (...args: string[]) => SetMetadata('role', args);

// 创建参数装饰器
export const ReqUrl = createParamDecorator((data:string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>()  // 获取请求实例

    return req.url;
})
