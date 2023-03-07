import { 
  Controller, 
  Get, 
  Post, 
  Res, 
  Session, 
  Body, 
  Inject
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';

/**
 * 响应状态吗规范
 * 200 请求成功
 * 304 Not Modifiend 协商缓存，返回了缓存值
 * 400 Bad Request 参数错误
 * 401 Unauthorized token错误
 * 403 Forbidden referer origin 验证失败，无权访问
 * 404 Not Found 路径不存在
 * 500 Internal Server Error 服务端错误 
 * 502 Bad Gateway 上游接口错误或者服务器错误
 */
  
// 整体版本控制，对控制器下面的所有方法有用
// @Controller({
//   path: 'user',
//   version: '12'
// })
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    @Inject('globalConfig') private readonly gConfig: any // 注入全局模块
  ) {}

  @Get('getCode')
  createCode(@Res() res, @Session() session) {
    const { text, data } = this.userService.createCode();

    session.code = text;
    res.type('image/svg+xml')
    res.send(data)
  }

  @Post('create')
  createUser(@Body() Body, @Session() session) {
    console.log(Body, session.code)
    return this.userService.createUser(Body, session.code)
  }

  @Get('getConfig')
  getGlobalConfig() {
    return this.gConfig;
  }
} 
