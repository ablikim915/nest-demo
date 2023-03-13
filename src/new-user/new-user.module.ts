import { Module } from '@nestjs/common';
import { NewUserService } from './new-user.service';
import { NewUserController } from './new-user.controller';
import { NewUser } from './entities/new-user.entity';
import { Tags } from './entities/tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewUser, Tags]) // 数据库实体关联，并自动创建对应的表
  ],
  controllers: [NewUserController],
  providers: [NewUserService]
})
export class NewUserModule {}
