/**
 * AuthController 负责处理应用中的认证相关请求。
 * 它提供了登录、登出、检查用户登录状态以及处理JWT登录和刷新等功能。
 * 通过使用不同的守卫（Guards），它确保了只有在满足特定认证条件的情况下，用户才能访问这些操作。
 * 这包括使用本地策略进行登录、JWT策略进行状态检查和刷新令牌操作等。
 */

import { Controller, Get, Post, UseGuards, Req, Res, UnauthorizedException, Body } from '@nestjs/common';
import type { Request, Response } from 'express';

import {
  AuthService,
  LocalLoginGuard,
  Payload,
  AuthenticatedGuard,
  LocalAuthGuard,
  JwtAuthGuard,
  JwtSign,
  JwtVerifyGuard,
} from '../../auth';
import { ReqUser } from '../../common';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  // 登录操作，需要在请求体中提供用户名和密码
  // 使用LocalLoginGuard进行本地登录认证
  // See test/e2e/local-auth.spec.ts
  @Post('login')
  @UseGuards(LocalLoginGuard)
  public login(@ReqUser() user: Payload): Payload {
    return user;
  }

  // 登出操作，清除用户的登录状态并重定向到首页
  @Get('logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    req.logout(() => {
      res.redirect('/');
    });
  }

  // 检查用户的登录状态，使用AuthenticatedGuard确保用户已认证
  @Get('check')
  @UseGuards(AuthenticatedGuard)
  public check(@ReqUser() user: Payload): Payload {
    return user;
  }

  // JWT登录操作，使用LocalAuthGuard进行认证
  // See test/e2e/jwt-auth.spec.ts
  @UseGuards(LocalAuthGuard)
  @Post('jwt/login')
  public jwtLogin(@ReqUser() user: Payload): JwtSign {
    return this.auth.jwtSign(user);
  }

  // JWT状态检查，使用JwtAuthGuard确保用户持有有效的JWT
  @UseGuards(JwtAuthGuard)
  @Get('jwt/check')
  public jwtCheck(@ReqUser() user: Payload): Payload {
    return user;
  }

  // JWT刷新操作，仅验证刷新令牌而不检查访问令牌的过期状态
  // 使用JwtVerifyGuard进行验证
  @UseGuards(JwtVerifyGuard)
  @Post('jwt/refresh')
  public jwtRefresh(@ReqUser() user: Payload, @Body('refresh_token') token?: string): JwtSign {
    if (!token || !this.auth.validateRefreshToken(user, token)) {
      throw new UnauthorizedException('InvalidRefreshToken');
    }

    return this.auth.jwtSign(user);
  }
}
