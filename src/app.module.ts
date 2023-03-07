import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/global.module'
import { ListModule } from './list/list.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UserModule, GlobalModule, ListModule, UploadModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
