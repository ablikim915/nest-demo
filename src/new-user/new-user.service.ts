import { Injectable } from '@nestjs/common';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { UpdateNewUserDto } from './dto/update-new-user.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUser } from './entities/new-user.entity';
import { Tags } from './entities/tags.entity';

@Injectable()
export class NewUserService {
  constructor(
    @InjectRepository(NewUser) private readonly userDBInst: Repository<NewUser>, // 初始化user表实例
    @InjectRepository(Tags) private readonly tagDBInst: Repository<Tags>, // 初始化tags表实例
  ) {}

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
      take: query.pageSize,
      // 查询tags表中的关联关系
      relations: ['tagsss']
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

  async addTags(params: {tags: string[], userId: string | number}) {
    const { tags, userId } = params;
    const userinfo = await this.userDBInst.findOne({
      where: {
        id: userId
      }
    })

    const tagList: Tags[] = []
    for(let item of tags) {
      const T = new Tags();
      T.name = item;
      await this.tagDBInst.save(T)
      tagList.push(T)
    }
    userinfo.tagsss = tagList;
    this.userDBInst.save(userinfo)
    return true;
  }
}
