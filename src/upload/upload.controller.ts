import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors( // 处理上传文件
    FileInterceptor('file') // 定义接口字段名称
  )
  upload(@UploadedFile() file) {
    console.log('--file--', file)
    return '上传成功'
  }
}
