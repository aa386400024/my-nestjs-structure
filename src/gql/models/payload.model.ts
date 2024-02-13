// payload.model.ts 文件用途：定义 GraphQL 中使用的 Payload 对象类型。
// 这个类型主要用于用户认证和授权过程中，携带用户的基本信息和角色信息。

import { ObjectType } from '@nestjs/graphql';

@ObjectType() // 使用 @ObjectType 装饰器定义 GraphQL 的对象类型
export class Payload {
  public userId!: string; // 用户ID，唯一标识一个用户
  public username!: string; // 用户名，用户的登录名
  public roles: string[] = []; // 用户角色，数组形式，存储用户所有的角色信息
}
