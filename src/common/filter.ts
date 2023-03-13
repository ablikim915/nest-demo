import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus  } from "@nestjs/common";
import { Request, Response } from 'express'

// 全局请求错误错误过滤器，处理报错后处理响应数据
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp() // 获取上下文
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const statusCode =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

        let msg:any = exception instanceof HttpException ? exception.getResponse() : exception;
        if (typeof msg === 'object') {
            msg = Array.isArray(msg.message) ? msg.message[0] : msg.message;
        } else {
            msg = msg.toString()
        }
 
        response.status(statusCode).json({
            success: false,
            time: new Date(),
            data: msg,
            status: statusCode,
            path: request.url
        })
    }
}   
