import { Controller, Get, Post, Body, Param,  
  ParseUUIDPipe, ParseIntPipe 
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
// import * as uuid from 'uuid'

// console.log('-uuid-', uuid.v4())

/**
 * 类型转换管道
  ValidationPipe
  ParseIntPipe
  ParseFloatPipe
  ParseBoolPipe
  ParseArrayPipe
  ParseUUIDPipe
  ParseEnumPipe
  DefaultValuePipe
 */
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() params: CreateLoginDto) {
    return this.loginService.create(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: any) {
    return this.loginService.findOne(id);
  }
}
