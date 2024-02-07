/**
 * 本文件定义了一个名为JwtAuthGuard的守卫（Guard），专门用于处理JWT（Json Web Token）的认证策略。
 * 它继承自NestJS的AuthGuard类，并指定'jwt'策略，用于在请求处理流程中执行JWT认证逻辑。
 * JwtAuthGuard支持GraphQL和REST API的请求，能够根据请求的类型自动提取JWT，
 * 并验证JWT的有效性。这是构建安全NestJS应用的基础之一，确保只有持有有效JWT的用户才能访问受保护的资源。
 * 它与JwtVerifyGuard的主要区别在于使用的策略名称，此处为'jwt'，通常用于JWT的验证和用户身份的确认。
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
// JwtAuthGuard类继承自AuthGuard，指定使用'jwt'策略进行JWT认证
export class JwtAuthGuard extends AuthGuard('jwt') {
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
