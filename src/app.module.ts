// AppModule是NestJS应用的根模块。它负责整合应用中的所有模块、配置全局服务如日志、配置管理、数据库连接等。
// 通过在此模块中导入和配置其他模块和服务，我们可以构建出结构清晰、功能丰富的后端应用。

import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE, RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth';
import { BaseModule } from './base';
import { CommonModule, ExceptionsFilter } from './common';
import { configuration, loggerOptions } from './config';
import { SampleModule as DebugSampleModule } from './debug';
import { GqlModule } from './gql';
import { SampleModule } from './sample';

@Module({
  imports: [
    // 日志模块配置
    // https://getpino.io
    // https://github.com/iamolegga/nestjs-pino
    LoggerModule.forRoot(loggerOptions),
    // 应用配置模块
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局模块，无需在其他模块中再次导入
      load: [configuration], // 加载配置函数，动态配置应用
    }),
    // 数据库模块配置
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'), // 使用配置服务动态配置数据库连接
      }),
      inject: [ConfigService], // 注入ConfigService
    }),
    // 静态文件服务配置
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`, // 静态文件目录
      renderPath: '/', // 访问静态文件的路由
    }),
    // 服务模块
    AuthModule, // 身份验证模块
    CommonModule, // 通用模块，提供全局服务
    BaseModule, // 基础模块
    SampleModule, // 示例模块
    GqlModule, // GraphQL模块
    DebugSampleModule, // 调试用的示例模块
    // 路由模块配置
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([
      {
        path: 'test',
        module: SampleModule,
      },
      {
        path: 'test',
        module: DebugSampleModule,
      },
    ]),
  ],
  providers: [
    // 全局异常过滤器配置
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    // 全局管道配置，用于验证和转换输入数据
    // https://docs.nestjs.com/pipes#global-scoped-pipes
    // https://docs.nestjs.com/techniques/validation
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true, // 自动将输入数据转换为DTO实例
        whitelist: true, // 自动剔除非白名单属性
      }),
    },
  ],
})
export class AppModule {}
