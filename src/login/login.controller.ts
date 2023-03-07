import { Controller, Get, Post, Body, Param,  
  ParseUUIDPipe, ParseIntPipe 
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import * as uuid from 'uuid'

console.log('-uuid-', uuid.v4())

/**
 * 管道转换
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
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: any) {
    return this.loginService.findOne(id);
  }
}
