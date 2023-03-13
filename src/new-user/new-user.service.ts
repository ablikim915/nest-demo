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

  async findAll(query: {keyword: string, page: number, pageSize: number}) {
    const data = await this.userDBInst.find({
      where: {
        name: Like(`%${query.keyword}%`)
      },
      // 排序
      order: {
        id: 'DESC'  // DESC:倒序  ASC:正序
      },
      // 分页
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize
    });
    // 返回总数
    const total = await this.userDBInst.count({
      where: {
        name: Like(`%${query.keyword}%`)
      }
    })
    return {
      data,
      total
    }
  }

  update(id: number, updateNewUserDto: UpdateNewUserDto) {
    return this.userDBInst.update(id, updateNewUserDto);
  }

  remove(id: number) {
    return this.userDBInst.delete(id);
  }
}
