/**
 * 本文件定义了一个名为LocalLoginGuard的守卫（Guard），专门用于处理基于NestJS Passport的本地登录策略认证。
 * 它继承自NestJS的AuthGuard类，并指定'local'策略，用于在请求处理流程中执行认证逻辑。
 * 当请求到达受保护的路由时，LocalLoginGuard会被触发，它负责调用本地策略进行用户认证，
 * 并根据认证结果决定是否允许请求继续执行。这是实现基于NestJS的认证机制的关键部分之一，
 * 旨在提供一个安全的用户登录处理流程。
 */

// 导入NestJS的装饰器和守卫相关的类
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// 导入express的Request类型，用于类型注解
import type { Request } from 'express';

// 使用@Injectable装饰器，使得这个守卫可以被NestJS的依赖注入系统管理
@Injectable()
// LocalLoginGuard类继承自AuthGuard，指定使用'local'策略进行认证
export class LocalLoginGuard extends AuthGuard('local') implements CanActivate {
  // 重写canActivate方法，这是NestJS守卫中必须实现的方法，用于决定请求是否被允许执行后续操作
  public override async canActivate(context: ExecutionContext): Promise<boolean> {
    // 调用父类AuthGuard的canActivate方法，执行认证逻辑
    const result = <boolean>await super.canActivate(context);
    // 从上下文中获取当前的HTTP请求对象
    const request = context.switchToHttp().getRequest<Request>();
    // 调用父类的logIn方法，用于完成登录过程（如设置session）
    await super.logIn(request);

    // 返回认证结果，如果认证成功，允许继续执行后续操作
    return result;
  }
}
