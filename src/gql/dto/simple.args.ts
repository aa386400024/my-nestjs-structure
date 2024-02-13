// 该文件定义了SimpleArgs类，用作GraphQL操作中的参数类型。
// 利用NestJS GraphQL的@ArgsType装饰器，这个类被标记为一个参数对象类型，
// 允许在GraphQL查询或突变中作为参数传递。通过class-validator库的装饰器，
// 如@IsString和@IsOptional，为参数提供了验证规则，确保输入的有效性和正确性。
// 这个类特别适用于处理简单的GraphQL操作，其中需要接收标题（title）和可选的内容（content）作为参数。

import { ArgsType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SimpleArgs {
  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string;
}
