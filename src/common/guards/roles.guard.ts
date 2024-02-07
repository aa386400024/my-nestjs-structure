/**
 * RolesGuard 是一个实现基于角色的访问控制（RBAC）的守卫。
 * 它通过检查请求中的用户角色是否匹配路由处理器或控制器上指定的角色来决定是否允许访问。
 * 这个守卫可以应用于整个控制器或单个路由处理器，提供灵活的权限管理机制。
 * 它支持REST API和GraphQL API，确保在不同类型的请求中都能有效工作。
 */

// 导入NestJS的装饰器和接口
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// 导入Reflector，用于访问路由处理器或控制器上的自定义元数据
import { Reflector } from '@nestjs/core';
// 导入GraphQL执行上下文相关的类型
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
// 导入express的Request类型
import type { Request } from 'express';

// 使用@Injectable装饰器，使得这个守卫可以被NestJS的依赖注入系统管理
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    // 获取路由处理器或控制器上设置的角色元数据
    const roles = this.reflector.getAllAndOverride<string[] | undefined>('roles', [
      context.getHandler(), // 方法上的角色
      context.getClass(), // 控制器上的角色
    ]);

    // 如果没有设置角色，则默认允许访问
    if (!roles) {
      return true;
    }

    // 根据请求的类型获取请求对象
    let request: Request;
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext<{ req: Request }>();
      request = ctx.req;
    } else {
      request = context.switchToHttp().getRequest<Request>();
    }

    // 获取请求中的用户对象
    const { user } = request;
    // 如果没有用户信息或用户没有任何角色，则拒绝访问
    if (!user) {
      return false;
    }

    // 检查用户的角色是否包含在允许的角色列表中
    return user.roles.some((role: string) => roles.includes(role));
  }
}
