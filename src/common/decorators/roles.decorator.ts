/**
 * Roles装饰器用于定义访问特定路由所需的用户角色。
 * 它通过为路由处理函数设置元数据来实现，这些元数据随后可以被守卫（Guard）检查，
 * 以确定是否允许用户访问该路由。这是实现基于角色的访问控制（RBAC）的一种简便方法。
 * 使用Roles装饰器可以明确指定哪些角色的用户被允许执行特定的操作，增强了应用的安全性。
 */

// 导入NestJS的SetMetadata和CustomDecorator函数
import { SetMetadata, CustomDecorator } from '@nestjs/common';

// 定义Roles装饰器，接受一个角色字符串数组
export const Roles = (...roles: string[]): CustomDecorator => SetMetadata('roles', roles);
