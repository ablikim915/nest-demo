import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'

@Injectable()
export class UserService {
  createCode() {
    return svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#1f66af',
    })
  }

  createUser(data: any = {}, session: string = '') {
    if ((`${data?.code}`)?.toLocaleLowerCase() === session.toLocaleLowerCase()) {
      return {
        code: 200,
        msg: '登录成功'
      }
    } else {
      return {
        code: 500,
        msg: '验证码错误'
      }
    }
  }
}
