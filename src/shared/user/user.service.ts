/**
 * user.service.ts 文件用途：提供用户相关的业务逻辑处理。
 * 本服务类定义了用户数据的获取方法，演示了如何实现异步数据访问和处理。
 *
 * 通过定义 fetch 方法，本服务提供了一个简单的示例，模拟从数据库或其他数据源异步获取用户信息。
 * 这个示例方法返回一个包含用户信息及密码的对象，实际应用中，应当避免将密码等敏感信息暴露给客户端。
 *
 * 服务类通过 @Injectable 装饰器标记为可注入的依赖，使得可以在其他组件中通过构造函数注入使用。
 */

import { Injectable } from '@nestjs/common';

import type { User } from './user.interface'; // 导入用户接口定义

@Injectable() // 标记为可注入的服务
export class UserService {
  /**
   * 模拟异步获取用户信息。
   * @param username 用户名
   * @returns 返回一个 Promise，解析为包含用户信息及密码的对象。
   */
  public async fetch(username: string): Promise<User & { password: string }> {
    // 模拟异步操作，实际应用中应替换为数据库查询等异步数据访问操作
    return Promise.resolve({
      id: 'test', // 模拟的用户 ID
      password: 'crypto', // 模拟的密码，实际应用中不应返回密码信息
      name: username, // 使用传入的用户名
      email: `${username}@test.com`, // 模拟的电子邮件地址
      roles: ['test'], // 模拟的用户角色列表 // ['admin', 'etc', ...]
    });
  }
}
