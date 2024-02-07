// JwtStrategy文件定义了JWT验证策略，用于验证和解析JWT令牌。
// 这个策略是身份验证流程的核心部分，确保只有持有有效JWT令牌的用户才能访问受保护的资源。

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { JwtPayload, Payload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取JWT令牌
      ignoreExpiration: false, // 检查令牌的过期时间，确保令牌有效
      secretOrKey: config.get<string>('jwtSecret'), // 使用配置服务获取JWT密钥，用于验证令牌签名
    });
  }

  // validate方法用于验证令牌的有效性，并解析令牌中的载荷信息。
  // 如果验证成功，它会返回一个包含用户信息的对象。
  public validate(payload: JwtPayload): Payload {
    return { userId: payload.sub, username: payload.username, roles: payload.roles }; // 从JWT载荷中提取用户信息并返回
  }
}
