import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import * as session from 'express-session'
import { Request, Response, NextFunction } from "express";
import * as cors from 'cors';

const whiteList = ["/list"] // 白名单

function GlobalMiddleWare (req: Request, res: Response, next: NextFunction) {
  if (whiteList.includes(req.originalUrl)) {
    next()
  } else {
    res.send({
      msg: '暂无权限访问'
    })
  }
}

async function bootstrap() {
  const port = 8008;
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.use(session({
    secret: 'myNestApp',
    rolling: true,
    name: 'myNestApp.sid',
    cookie: {
      maxAge: 99999999
    }
  }))
  app.use(cors()) // 解决跨域(第三方中间件)
  // app.use(GlobalMiddleWare) // 全局中间件
  await app.listen(port);

  Logger.log(`服务已启动 --> http://localhost:${port}`)
}
bootstrap();
