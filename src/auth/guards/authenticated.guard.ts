/**
 * 本文件定义了一个名为AuthenticatedGuard的守卫（Guard），用于检查请求是否已经通过身份验证。
 * 它不依赖于特定的认证策略（如JWT或Session），而是通用地检查请求对象上的`isAuthenticated`方法的返回值，
 * 来确定请求是否已认证。这使得AuthenticatedGuard可以灵活地用于不同的认证机制中。
 * 此外，它支持GraphQL和REST API的请求，能够自动识别请求类型并相应地提取请求对象。
 * 这是构建安全NestJS应用的基础之一，确保敏感操作或数据只能被认证用户访问。
 */

// 导入NestJS的装饰器和守卫相关的类
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// 导入Reflector，用于访问路由处理程序的自定义元数据
import { Reflector } from '@nestjs/core';
// 导入GraphQL执行上下文相关的类，用于处理GraphQL请求
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
// 导入express的Request类型，用于类型注解
import type { Request } from 'express';

// 使用@Injectable装饰器，使得这个守卫可以被NestJS的依赖注入系统管理
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  // https://github.com/nestjs/nest/issues/964#issuecomment-480834786
  public canActivate(context: ExecutionContext): boolean {
    // 检查当前路由处理程序是否被标记为公开（即无需认证即可访问）
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    // 根据请求的类型（GraphQL或REST API）来获取请求对象
    const request = this.getRequest(context);
    // 调用请求对象上的`isAuthenticated`方法，检查用户是否已经通过身份验证
    return request.isAuthenticated();
  }

  private getRequest(context: ExecutionContext): Request {
    // 如果请求来自GraphQL，特别处理以从GraphQL上下文中提取请求对象
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext<{ req: Request }>();
      return ctx.req;
    }

    // 对于非GraphQL请求，直接从HTTP上下文中提取请求对象
    return context.switchToHttp().getRequest<Request>();
  }
}
