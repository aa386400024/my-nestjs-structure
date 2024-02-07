// 该文件是NestJS应用的启动文件。它负责创建NestJS应用实例、配置中间件、全局拦截器等，
// 并启动应用。这个文件通常包含应用的全局设置，如日志、安全性配置、全局拦截器和过滤器等。

import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';

/**
 * 参考文档：
 * https://docs.nestjs.com
 * https://github.com/nestjs/nest/tree/master/sample
 * https://github.com/nestjs/nest/issues/2249#issuecomment-494734673
 */
async function bootstrap(): Promise<string> {
  const isProduction = process.env.NODE_ENV === 'production'; // 判断当前是否为生产环境。
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true, // 启用日志缓冲。
  });

  app.useLogger(app.get(Logger)); // 使用nestjs-pino提供的Logger作为应用的日志记录器。
  app.useGlobalInterceptors(new LoggerErrorInterceptor()); // 添加全局拦截器，用于日志记录。

  if (isProduction) {
    app.enable('trust proxy'); // 生产环境下启用代理支持，用于正确处理SSL和访问者IP。
  }

  // 应用中间件
  middleware(app);

  app.enableShutdownHooks(); // 启用应用关闭钩子。
  await app.listen(process.env.PORT || 3000); // 启动应用并监听端口。

  return app.getUrl(); // 返回应用的URL。
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap(); // 启动应用。
    NestLogger.log(url, 'Bootstrap'); // 记录启动日志。
  } catch (error) {
    NestLogger.error(error, 'Bootstrap'); // 记录启动错误日志。
  }
})();
