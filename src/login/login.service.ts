import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';

@Injectable()
export class LoginService {
  create(createLoginDto: CreateLoginDto) {
    return 'This action adds a new login';
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }
}
