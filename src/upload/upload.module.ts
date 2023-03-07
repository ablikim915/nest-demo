import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';

// 初始化存放静态图片资源的目录模块2
const ImageDirModule = MulterModule.register({
  storage: diskStorage({
    destination: join(__dirname, '../images'),
    filename: (_, file, cb) => {
      const fileName = `${new Date().getTime() + extname(file.originalname)}`
      return cb(null, fileName);
    }
  })
})

@Module({
  imports: [ImageDirModule],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
