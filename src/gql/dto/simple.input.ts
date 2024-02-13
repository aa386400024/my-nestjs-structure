// 该文件定义了SimpleInput类，用作GraphQL操作中的输入类型。
// 利用NestJS GraphQL的@InputType装饰器，这个类被标记为GraphQL的输入类型，
// 允许在GraphQL突变（Mutation）中作为输入对象使用。通过class-validator库的装饰器，
// 如@IsString、@IsOptional和@ArrayNotEmpty，为输入字段提供了验证规则，
// 确保输入数据的有效性和正确性。这个类特别适用于需要接收标题（title）、可选内容（content）和标签数组（tags）作为输入的GraphQL操作。

import { InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class SimpleInput {
  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags!: string[];
}
