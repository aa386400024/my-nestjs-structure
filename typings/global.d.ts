/**
 * global.d.ts 文件用途：定义全局类型和命名空间扩展。
 * 本文件中的类型定义和命名空间扩展用于在整个应用的不同部分共享通用的类型和接口。
 * 这包括对 NodeJS 和 Express 的扩展，以及自定义的全局类型定义。
 *
 * 通过在此文件中声明全局类型和接口，可以避免在应用的多个地方重复定义相同的类型，
 * 从而提高代码的可维护性和可读性。
 */

import type { Payload } from '../src/auth'; // 导入 Payload 类型

export declare global {
  // 定义一个全局类型 AnyObject，可用于描述任意对象
  type AnyObject = Record<string, unknown>;

  // 扩展 NodeJS 的 ProcessEnv 接口，添加环境变量的类型定义
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string; // 应用环境（如 development、production）
      PORT: string; // 应用监听的端口

      DB_TYPE: string; // 数据库类型
      DB_HOST: string; // 数据库主机地址
      DB_PORT: string; // 数据库端口
      DB_USER: string; // 数据库用户
      DB_PASSWORD: string; // 数据库密码
      DB_NAME: string; // 数据库名称

      JWT_SECRET: string; // JWT 密钥
      JWT_REFRESH_SECRET: string; // JWT 刷新密钥
    }
  }

  // 扩展 Express 的 Request 接口，添加自定义属性
  namespace Express {
    interface Request {
      customProps: object; // 用于 pino-http 的自定义属性
    }
    // 扩展 Express 的 User 接口，使其包含 Payload 类型
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends Payload {}
  }
}
