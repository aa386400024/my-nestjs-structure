/**
 * 本文件定义了一个名为JwtVerifyGuard的守卫（Guard），专门用于处理JWT（Json Web Token）的验证策略。
 * 它继承自NestJS的AuthGuard类，并指定'jwt-verify'策略，用于在请求处理流程中执行JWT验证逻辑。
 * JwtVerifyGuard支持GraphQL和REST API的请求，能够根据请求的类型自动提取JWT，
 * 并验证JWT的有效性。这是构建安全NestJS应用的基础之一，确保只有持有有效JWT的用户才能访问受保护的资源。
 */

// 导入NestJS的装饰器和守卫相关的类
import { ExecutionContext, Injectable } from '@nestjs/common';
// 导入GraphQL执行上下文相关的类，用于处理GraphQL请求
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
// 导入express的Request类型，用于类型注解
import type { Request } from 'express';

// 使用@Injectable装饰器，使得这个守卫可以被NestJS的依赖注入系统管理
@Injectable()
// JwtVerifyGuard类继承自AuthGuard，指定使用'jwt-verify'策略进行JWT验证
export class JwtVerifyGuard extends AuthGuard('jwt-verify') {
  // 重写getRequest方法，用于从不同类型的请求中提取JWT
  public override getRequest(context: ExecutionContext): Request {
    // 如果请求来自GraphQL，特别处理以从GraphQL上下文中提取请求对象
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext<{ req: Request }>();
      return ctx.req;
    }

    // 对于非GraphQL请求，直接从HTTP上下文中提取请求对象
    return context.switchToHttp().getRequest<Request>();
  }
}
