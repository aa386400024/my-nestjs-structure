// AuthModule是NestJS应用中处理身份验证逻辑的模块。它负责配置和提供身份验证服务，
// 包括JWT令牌的签发和验证、用户登录逻辑等。通过集成JwtModule和定义相关的策略（如LocalStrategy, JwtStrategy），
// 该模块为应用提供了一套完整的身份验证解决方案。

import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthSerializer } from './auth.serializer'; // 用户序列化和反序列化逻辑
import { AuthService } from './auth.service'; // 身份验证服务
import { LocalStrategy, JwtStrategy, JwtVerifyStrategy } from './strategies'; // 身份验证策略
import { UserModule } from '../shared/user'; // 用户模块，通常用于获取和管理用户信息

@Global() // 将AuthModule标记为全局模块，使其服务在整个应用中都可用
@Module({
  imports: [
    UserModule, // 导入UserModule，AuthModule依赖于它来获取用户信息
    JwtModule.registerAsync({
      // 异步注册JwtModule，配置JWT相关选项
      useFactory: (config: ConfigService) => ({
        // 使用工厂函数动态配置JWT模块
        secret: config.get('jwtSecret'), // 从配置服务中获取JWT密钥
        signOptions: { expiresIn: '1d' }, // 设置令牌过期时间
      }),
      inject: [ConfigService], // 注入ConfigService以在工厂函数中使用
    }),
  ],
  providers: [
    AuthService, // 提供AuthService
    AuthSerializer, // 提供AuthSerializer
    LocalStrategy, // 提供LocalStrategy
    JwtStrategy, // 提供JwtStrategy
    JwtVerifyStrategy, // 提供JwtVerifyStrategy
  ],
  exports: [AuthService], // 将AuthService导出，使其可以在其他模块中注入和使用
})
export class AuthModule {}
