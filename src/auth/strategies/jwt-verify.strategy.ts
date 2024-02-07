// JwtVerifyStrategy文件定义了JWT验证策略，专门用于验证JWT令牌的有效性。
// 这个策略通常用于刷新令牌流程中，用于验证旧的访问令牌（即使它已过期）并发放新的访问令牌。

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { JwtPayload, Payload } from '../auth.interface';

@Injectable()
export class JwtVerifyStrategy extends PassportStrategy(Strategy, 'jwt-verify') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头的Bearer令牌中提取JWT
      ignoreExpiration: true, // 在处理刷新令牌时不检查访问令牌的过期时间
      secretOrKey: config.get<string>('jwtSecret'), // 使用配置服务获取JWT密钥
    });
  }

  // validate方法用于验证JWT令牌的有效性。如果令牌有效，它会返回用户的基本信息。
  public validate(payload: JwtPayload): Payload {
    return { userId: payload.sub, username: payload.username, roles: payload.roles }; // 从JWT载荷中提取并返回用户信息
  }
}
