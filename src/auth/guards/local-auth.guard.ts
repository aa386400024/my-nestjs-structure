/**
 * 本文件定义了一个名为LocalAuthGuard的守卫（Guard），专门用于处理基于NestJS Passport的本地认证策略。
 * 它继承自NestJS的AuthGuard类，并指定'local'策略，用于在请求处理流程中执行认证逻辑。
 * 当请求到达受保护的路由时，LocalAuthGuard会被触发，它负责调用本地策略进行用户认证，
 * 确保只有在用户成功通过认证后，才能访问受保护的资源。这是构建安全NestJS应用的基础之一，
 * 提供了一个简洁而强大的方法来实现用户认证。
 */

// 导入NestJS的装饰器和守卫相关的类
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 使用@Injectable装饰器，使得这个守卫可以被NestJS的依赖注入系统管理
@Injectable()
// LocalAuthGuard类继承自AuthGuard，指定使用'local'策略进行认证
export class LocalAuthGuard extends AuthGuard('local') {
  // 这里不需要额外实现任何方法，因为它直接使用了AuthGuard提供的功能，
  // 并通过指定'local'策略来实现具体的认证逻辑。
}
