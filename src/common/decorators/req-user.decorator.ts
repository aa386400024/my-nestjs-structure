/**
 * ReqUser装饰器用于在NestJS控制器的路由处理函数中方便地获取当前请求的用户对象。
 * 它抽象了从请求对象中提取用户信息的过程，无论是在REST API还是GraphQL API中，
 * 使得开发者可以通过简单的参数装饰器来访问当前认证的用户。
 * 这在实现基于用户状态的业务逻辑时非常有用。
 */

// 导入NestJS的createParamDecorator函数和ExecutionContext接口
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// 导入NestJS的GraphQL执行上下文相关的类型
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
// 导入express的Request类型
import type { Request } from 'express';

// 定义ReqUser参数装饰器
export const ReqUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  let request: Request;

  // 根据上下文类型判断是REST API还是GraphQL API请求，并相应地获取请求对象
  if (context.getType<GqlContextType>() === 'graphql') {
    const ctx = GqlExecutionContext.create(context).getContext<{ req: Request }>();
    request = ctx.req;
  } else {
    request = context.switchToHttp().getRequest<Request>();
  }

  // 从请求对象中返回用户信息
  return request.user;
});
