import { Module } from '@nestjs/common';
import { DbTestService } from './db-test.service';
import { DbTestController } from './db-test.controller';
import { DbTest } from './entities/db-test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forFeature([DbTest]) // 数据库实体关联，并自动创建对应的表
  ],
  controllers: [DbTestController],
  providers: [DbTestService]
})
export class DbTestModule {}
