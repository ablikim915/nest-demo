import { Module, Global } from '@nestjs/common';

const GlobalConfig = {
  name: 'global',
  value: 123456
}

@Global() // 全局module装饰器， 把当前的GlobalModule模块设置成全局的
@Module({
  providers: [
    {
      provide: 'globalConfig',
      useValue: GlobalConfig
    }
  ],
  exports: [
    {
      provide: 'globalConfig',
      useValue: GlobalConfig
    }
  ]
})
export class GlobalModule {}
