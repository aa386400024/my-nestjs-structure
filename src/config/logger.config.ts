// 该文件定义了日志配置。在这里，我们配置了nestjs-pino日志库的参数，
// 包括请求ID的生成、自动日志记录的忽略规则、以及生产环境和开发环境下的日志级别和格式。
// 这样的配置有助于在不同环境下优化日志的记录和查看。

import type { Request } from 'express';
import { nanoid } from 'nanoid';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';

const passUrl = new Set(['/health', '/graphql']); // 定义不需要自动记录日志的URL路径。

export const loggerOptions: Params = {
  pinoHttp: [
    {
      // 在生产日志中更改时间值的配置。这里被注释掉了，如果需要，可以根据文档启用并配置。
      // https://getpino.io/#/docs/api?id=timestamp-boolean-function
      quietReqLogger: true, // 静默请求日志器，减少请求日志的冗余。
      genReqId: (req): ReqId => (<Request>req).header('X-Request-Id') ?? nanoid(), // 生成请求ID，优先使用请求头中的'X-Request-Id'，否则生成一个新的ID。
      ...(process.env.NODE_ENV === 'production'
        ? {}
        : {
            level: 'debug', // 开发环境下设置日志级别为debug。
            // 配置美化日志输出，仅在非生产环境下使用。
            // https://github.com/pinojs/pino-pretty
            transport: {
              target: 'pino-pretty',
              options: { sync: true, singleLine: true },
            },
          }),
      autoLogging: {
        ignore: (req) => passUrl.has((<Request>req).originalUrl), // 自动忽略配置中指定的URL路径的日志记录。
      },
      customProps: (req) => (<Request>req).customProps, // 允许添加请求的自定义属性到日志中。
    },
    multistream(
      [
        // 配置日志输出到不同的流。
        // https://getpino.io/#/docs/help?id=log-to-different-streams
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr },
      ],
      { dedupe: true }, // 启用去重，避免在多个流中重复记录相同级别的日志。
    ),
  ],
};
