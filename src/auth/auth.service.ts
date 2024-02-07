// AuthService提供了身份验证相关的服务，包括用户验证、JWT令牌的签发和验证等功能。
// 它是处理用户认证逻辑的核心服务，依赖于UserService来获取用户信息，以及ConfigService和JwtService来处理JWT令牌。

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type { JwtPayload, JwtSign, Payload } from './auth.interface';
import { User, UserService } from '../shared/user';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService, // JWT服务，用于签发和验证JWT令牌
    private user: UserService, // 用户服务，用于获取用户信息
    private config: ConfigService, // 配置服务，用于获取应用配置
  ) {}

  // 验证用户凭证
  public async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.user.fetch(username); // 从UserService获取用户信息

    if (user.password === password) {
      // 验证密码
      const { password: pass, ...result } = user; // 剔除密码信息，返回用户信息
      return result;
    }

    return null; // 验证失败返回null
  }

  // 验证刷新令牌
  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (!this.jwt.verify(refreshToken, { secret: this.config.get('jwtRefreshSecret') })) {
      // 验证刷新令牌
      return false;
    }

    const payload = this.jwt.decode<{ sub: string }>(refreshToken); // 解码刷新令牌
    return payload.sub === data.userId; // 检查令牌中的用户ID是否匹配
  }

  // 签发JWT令牌
  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = { sub: data.userId, username: data.username, roles: data.roles }; // 创建JWT载荷

    return {
      access_token: this.jwt.sign(payload), // 签发访问令牌
      refresh_token: this.getRefreshToken(payload.sub), // 签发刷新令牌
    };
  }

  // 从令牌中获取载荷
  public getPayload(token: string): Payload | null {
    try {
      const payload = this.jwt.decode<JwtPayload | null>(token); // 解码令牌
      if (!payload) {
        return null;
      }

      return { userId: payload.sub, username: payload.username, roles: payload.roles }; // 返回载荷信息
    } catch {
      // 解码失败返回null
      return null;
    }
  }

  // 获取刷新令牌
  private getRefreshToken(sub: string): string {
    return this.jwt.sign(
      { sub },
      {
        secret: this.config.get('jwtRefreshSecret'), // 使用刷新令牌密钥
        expiresIn: '7d', // 设置过期时间
      },
    );
  }
}
