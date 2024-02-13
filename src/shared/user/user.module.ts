/**
 * user.module.ts 文件用途：定义用户模块。
 * 本模块负责封装用户相关的服务逻辑，通过提供 UserService 来实现。
 *
 * 通过将 UserService 注册为提供者并导出，UserModule 允许其他模块在导入 UserModule 时，
 * 能够复用 UserService，实现了服务的解耦和复用。
 *
 * 这种模块化的方式有助于维护大型应用的代码结构，使得各个部分之间的依赖关系清晰，
 * 并且可以轻松地在不同的模块间共享服务和组件。
 */

import { Module } from '@nestjs/common';

import { UserService } from './user.service'; // 导入用户服务

@Module({
  providers: [UserService], // 将 UserService 注册为当前模块的服务提供者
  exports: [UserService], // 导出 UserService，使其可以在其他模块中使用
})
export class UserModule {}
