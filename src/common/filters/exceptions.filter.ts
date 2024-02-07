/**
 * ExceptionsFilter 是一个全局异常过滤器，用于拦截和处理应用中抛出的所有异常。
 * 它能够处理来自REST API和GraphQL API的异常，为不同类型的请求提供统一的错误处理逻辑。
 * 通过记录错误日志并根据异常类型返回适当的HTTP状态码，这个过滤器帮助维护了应用的健壮性和安全性。
 * 对于内部服务器错误，它还会记录详细的错误信息和相关请求参数，便于问题的追踪和调试。
 */

import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost, GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';
import type { Request } from 'express';

// 使用@Catch()装饰器，使其能够捕获所有未被其他异常过滤器处理的异常
@Catch()
export class ExceptionsFilter extends BaseExceptionFilter implements GqlExceptionFilter {
  private readonly logger: Logger = new Logger();

  public override catch(exception: unknown, host: ArgumentsHost): void {
    let args: unknown;
    // 检查是否为GraphQL环境的异常，并尝试提取请求的操作名和变量
    if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      const {
        req: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          body: { operationName, variables },
        },
      } = gqlHost.getContext<{ req: Request }>();
      args = `${operationName} ${JSON.stringify(variables)}`;
    } else {
      // 对于REST环境，使用默认的异常处理逻辑
      super.catch(exception, host);
      // const req = host.switchToHttp().getRequest<Request>();
      // req.method, req.originalUrl...
      // args = req.body;
    }

    // 获取异常对应的HTTP状态码
    const status = this.getHttpStatus(exception);
    // 对于内部服务器错误，记录错误详情和请求参数
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (exception instanceof Error) {
        this.logger.error({ err: exception, args });
      } else {
        // 对于未知类型的异常，记录为"UnhandledException"
        this.logger.error('UnhandledException', exception);
      }
    }
  }

  // 辅助方法，用于获取异常对应的HTTP状态码
  private getHttpStatus(exception: unknown): HttpStatus {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
