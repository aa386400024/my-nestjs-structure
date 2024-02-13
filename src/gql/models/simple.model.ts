// simple.model.ts 文件用途：定义 GraphQL 中使用的 Simple 对象类型。
// 这个类型用于演示或处理包含基本字段的数据结构，例如 ID、分数、评级、标题、内容、标签和创建时间。

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType() // 使用 @ObjectType 装饰器定义 GraphQL 的对象类型
export class Simple {
  @Field(() => ID) // 使用 @Field 装饰器定义 GraphQL 字段，ID 表示唯一标识符
  public id!: number; // 唯一标识符，通常用于数据库主键

  @Field(() => Int) // 分数字段，使用 Int 类型
  public score?: number; // 分数，可选字段

  // 如果没有指定类型，默认使用 Float
  public rating?: number; // 评级，可选字段，没有使用 @Field 装饰器，默认为 Float 类型

  public title!: string; // 标题，必需字段
  public content?: string; // 内容，可选字段
  public tags?: string[]; // 标签，字符串数组，可选字段

  public createdAt?: Date; // 创建时间，Date 类型，可选字段
}
