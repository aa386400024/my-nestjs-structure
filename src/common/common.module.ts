/**
 * CommonModule 是一个全局模块，用于定义和提供整个应用范围内共享的服务和配置。
 * 它通过导入和导出一系列的服务提供者，确保这些服务在应用的任何地方都可以被注入和使用，
 * 从而促进了代码的复用和模块化。此外，CommonModule还配置了全局中间件，
 * 如LoggerContextMiddleware，用于在整个应用的请求处理流程中添加日志上下文等功能。
 */

// 导入NestJS的模块和中间件相关的装饰器
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// 导入应用级别的中间件
import { LoggerContextMiddleware } from './middleware';
// 自动导入所有提供者
import * as providers from './providers';

// 将providers目录下的所有服务自动注册为服务提供者
const services = Object.values(providers);

// 使用@Global()装饰器标记为全局模块
@Global()
@Module({
  // 注册服务提供者
  providers: services,
  // 将这些服务提供者导出，使其在其他模块中可用
  exports: services,
})
export class CommonModule implements NestModule {
  // 配置全局中间件
  public configure(consumer: MiddlewareConsumer): void {
    // 应用LoggerContextMiddleware到所有路由
    consumer.apply(LoggerContextMiddleware).forRoutes('*');
  }
}
