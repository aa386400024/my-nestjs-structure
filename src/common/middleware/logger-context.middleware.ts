/**
 * LoggerContextMiddleware 中间件用于在请求处理流程的早期阶段设置日志上下文。
 * 它通过解析请求中的授权头（Authorization header）来尝试识别用户，
 * 并将用户信息（如用户ID）添加到日志上下文中。这使得后续的日志记录可以包含用户身份信息，
 * 从而提供更详细的日志分析和问题追踪能力。此中间件对于构建需要审计或详细日志记录的应用尤其有用。
 */

// 导入NestJS的装饰器和接口
import { Injectable, NestMiddleware } from '@nestjs/common';
// 导入express的Request和Response类型
import type { Request, Response } from 'express';
// 导入nestjs-pino提供的PinoLogger服务
import { PinoLogger } from 'nestjs-pino';

// 导入AuthService，用于解析和验证JWT令牌
import { AuthService } from '../../auth';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  // GraphQL logging uses the apollo plugins.
  // https://docs.nestjs.com/graphql/plugins
  // https://docs.nestjs.com/graphql/field-middleware
  constructor(
    private readonly logger: PinoLogger, // 注入PinoLogger服务
    private auth: AuthService, // 注入AuthService
  ) {}

  public use(req: Request, _res: Response, next: () => void): void {
    // 尝试从请求头中获取授权信息
    const authorization = req.header('authorization');

    // 如果存在Bearer令牌，使用AuthService解析用户信息；否则，尝试从请求对象直接获取用户信息
    const user = authorization?.startsWith('Bearer') ? this.auth.getPayload(authorization.split(' ')[1]) : req.user;

    // 从用户信息中提取用户ID
    const userId = user?.userId;
    // 将用户ID添加到请求的自定义属性中，以便在日志中使用
    // for https://github.com/iamolegga/nestjs-pino/issues/608
    req.customProps = { userId };
    // 使用PinoLogger的assign方法将用户ID添加到日志上下文中
    this.logger.assign(req.customProps);

    // 调用next()继续处理请求
    next();
  }
}
