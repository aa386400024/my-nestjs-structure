// date.scalar.ts 文件用途：定义一个自定义的 GraphQL 标量类型 `Date`。
// 这个自定义标量类型用于在 GraphQL API 中处理日期数据，允许客户端以标准的 ISO 字符串格式发送和接收日期数据，
// 同时确保在服务器端以 `Date` 类型进行处理。

import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date) // 使用 @Scalar 装饰器定义自定义标量类型
export class DateScalar implements CustomScalar<string, Date | null> {
  public description = 'Date custom scalar type'; // 自定义标量类型的描述

  public parseValue(value: unknown): Date {
    if (typeof value !== 'number') {
      throw new Error('DateScalar can only parse number values'); // 确保只解析数字值
    }

    return new Date(value); // 将客户端传来的数字值转换为 Date 类型
  }

  public serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new Error('DateScalar can only serialize Date values'); // 确保只序列化 Date 类型的值
    }

    return value.toISOString(); // 将 Date 类型的值转换为 ISO 字符串格式，发送给客户端
  }

  public parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // 从 GraphQL 查询中解析整数值，并转换为 Date 类型
    }

    return null; // 如果 AST 类型不是 INT，返回 null
  }
}
