// LocalStrategy文件定义了本地身份验证策略，用于处理用户名和密码的验证。
// 这个策略通常用于处理登录请求，验证用户提交的用户名和密码是否有效。

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import type { Payload } from '../auth.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) { // 注入AuthService以使用其validateUser方法进行用户验证
    super(); // 调用父类的构造函数，初始化策略
  }

  // validate方法用于验证用户名和密码
  public async validate(username: string, password: string): Promise<Payload> {
    const user = await this.auth.validateUser(username, password); // 使用AuthService验证用户
    if (!user) {
      throw new UnauthorizedException('NotFoundUser'); // 如果用户不存在或密码不匹配，抛出未授权异常
    }

    // 如果验证通过，返回用户信息
    return { userId: user.id, username: user.name, roles: user.roles };
  }
}
