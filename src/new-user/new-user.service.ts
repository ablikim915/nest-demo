import { Injectable } from '@nestjs/common';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { UpdateNewUserDto } from './dto/update-new-user.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUser } from './entities/new-user.entity';

@Injectable()
export class NewUserService {
  constructor(@InjectRepository(NewUser) private readonly userDBInst: Repository<NewUser>) {}

  create(createNewUserDto: CreateNewUserDto) {
    const data = new NewUser()
    data.name = createNewUserDto.name;
    data.desc = createNewUserDto.desc;
    return this.userDBInst.save(data);
  }

  findAll(query: {keyword: string}) {
    return this.userDBInst.find({
      where: {
        name: Like(`%${query.keyword}%`)
      }
    });
  }

  update(id: number, updateNewUserDto: UpdateNewUserDto) {
    return this.userDBInst.update(id, updateNewUserDto);
  }

  remove(id: number) {
    return this.userDBInst.delete(id);
  }
}
