import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from 'express'

// 全局请求错误错误过滤器，处理报错后处理响应数据
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp() // 获取上下文
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const statusCode = exception.getStatus();

        response.status(statusCode).json({
            success: false,
            time: new Date(),
            data: exception.message,
            status: statusCode,
            path: request.url
        })
    }
}   