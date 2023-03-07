import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import * as session from 'express-session'
import { Request, Response, NextFunction } from "express";
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import { join } from 'path';
import { Response as ResponseIntercept } from './common/response';

const whiteList = ["/list"] // 白名单

// 全局中间件
function GlobalMiddleWare (req: Request, res: Response, next: NextFunction) {
  next()
  // if (whiteList.includes(req.originalUrl)) {
  //   next()
  // } else {
  //   res.send({
  //     msg: '暂无权限访问'
  //   })
  // }
}

async function bootstrap() {
  const port = 8008;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 为了直接访问images目录下的静态文件，比如：http://localhost:8008/1678088451052.png
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: "/img" // 设置虚拟路径
  })
  // 版本控制
  app.enableVersioning({
    type: VersioningType.URI
  })
  // 配置session
  app.use(session({
    secret: 'myNestApp',
    rolling: true,
    name: 'myNestApp.sid',
    cookie: {
      maxAge: 99999999
    }
  }))
  // 解决跨域(第三方中间件)
  app.use(cors()) 
  // 全局中间件
  app.use(GlobalMiddleWare) 
  // 注册全局拦截器
  app.useGlobalInterceptors(new ResponseIntercept())


  await app.listen(port);
  Logger.log(`服务已启动 --> http://localhost:${port}`)
}
bootstrap();
