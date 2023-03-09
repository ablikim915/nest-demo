import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/global.module'
import { ListModule } from './list/list.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbTestModule } from './db-test/db-test.module';

const connectDB = TypeOrmModule.forRoot({
  type: "mysql", //数据库类型
  username: "root", //账号
  password: "abu2019..", //密码
  host: "localhost", //host
  port: 3306, //
  database: "testDB", //库名
  // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
  synchronize:true, //synchronize字段代表是否自动将实体类同步到数据库
  retryDelay:500, //重试连接数据库间隔
  retryAttempts:10,//重试连接数据库的次数
  autoLoadEntities:true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
})

@Module({
  imports: [UserModule, GlobalModule, ListModule, UploadModule, LoginModule, GuardModule, connectDB, DbTestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
