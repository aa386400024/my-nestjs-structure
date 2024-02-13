// user.model.ts 文件用途：定义 GraphQL 中使用的 User 对象类型。
// 这个类型主要用于表示用户的基本信息，包括用户的 ID、姓名、电子邮件和角色。

import { ObjectType } from '@nestjs/graphql';

@ObjectType() // 使用 @ObjectType 装饰器定义 GraphQL 的对象类型
export class User {
  public id!: string; // 用户的唯一标识符，通常是数据库中的主键
  public name!: string; // 用户的姓名
  public email!: string; // 用户的电子邮件地址
  public roles: string[] = []; // 用户的角色列表，数组形式，存储用户所有的角色信息
}
