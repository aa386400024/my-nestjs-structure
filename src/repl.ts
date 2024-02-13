/**
 * repl.ts 文件用途：启动 NestJS 应用的 REPL 环境。
 * 本文件通过定义 bootstrap 函数，使用 NestJS 的 repl 方法启动一个 REPL 环境。
 * 这允许开发者在命令行中直接与应用的模块、服务等进行交互，便于测试、调试及理解应用的运行机制。
 *
 * REPL 环境是一个强大的工具，特别是在开发和调试阶段，它提供了一种快速执行代码片段、
 * 探索应用状态和调用应用逻辑的方式。
 *
 * 更多关于 NestJS REPL 的信息，请参考官方文档：
 * https://docs.nestjs.com/recipes/repl
 */

import { Logger as NestLogger } from '@nestjs/common';
import { repl } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  await repl(AppModule); // 启动 REPL 环境，以 AppModule 为根模块
}

void (async (): Promise<void> => {
  try {
    await bootstrap(); // 尝试启动 bootstrap 函数
    NestLogger.log('REPLServer', 'Bootstrap'); // 成功启动后记录日志
  } catch (error) {
    NestLogger.error(error, 'Bootstrap'); // 启动失败时记录错误日志
  }
})();
