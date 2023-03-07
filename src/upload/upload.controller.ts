import { Controller, Post, Get, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from "express";
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors( // 注册拦截器
    FileInterceptor('file') // 处理文件类请求的拦截器，并设置参数名
  )
  upload(@UploadedFile() file) {
    console.log('--file--', file)
    return '上传成功'
  }

  @Get('download')
  download(@Res() res:Response) {
    const url = join(__dirname, '../images/1678088451052.png');
    res.download(url)
  }

  // 文件流的方式下载文件
  @Get('stream')
  stream(@Res() res:Response) {
    const url = join(__dirname, '../images/1678088451052.png');
    const targetStream = new zip.Stream();
    targetStream.addEntry(url);

    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Dispoition', 'attachment; filename=legolas')

    targetStream.pipe(res)
  }
}
