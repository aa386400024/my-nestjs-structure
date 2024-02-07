/**
 * Public装饰器用于标记一个路由处理器或控制器为公开访问的，
 * 这意味着对于使用此装饰器标记的路由，不会执行身份验证检查。
 * 它通过在路由处理器或控制器上设置一个特定的元数据（'isPublic', true）来工作，
 * 认证守卫将检查这个元数据来决定是否跳过认证逻辑。
 * 这对于创建既有公开又有受保护路由的应用非常有用。
 */

// 导入NestJS的SetMetadata和CustomDecorator函数
import { SetMetadata, CustomDecorator } from '@nestjs/common';

// 定义Public装饰器，设置'isPublic'元数据为true
export const Public = (): CustomDecorator => SetMetadata('isPublic', true);
