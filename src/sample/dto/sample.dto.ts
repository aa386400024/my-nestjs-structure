// sample.dto.ts 文件用途：演示数据验证和转换的实现。
// 该 DTO 使用了 class-validator 库提供的装饰器进行数据验证，以确保接收到的数据满足特定条件，
// 并使用 class-transformer 库进行数据转换，以便在业务逻辑中使用更合适的数据格式。
// 参考文档：
// - 类验证器（class-validator）: https://github.com/typestack/class-validator#validation-decorators
// - 数据序列化（NestJS）: https://docs.nestjs.com/techniques/serialization

import { Transform, TransformFnParams } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { DateService } from '../providers';

export class SampleDto {
  @IsNumber() // 验证该字段必须为数字
  public id!: number;

  @IsString() // 验证该字段必须为字符串
  public title!: string;

  @IsOptional() // 该字段为可选
  @IsString() // 验证该字段必须为字符串，如果提供
  public content?: string; // 可选值

  @IsDateString() // 验证该字段必须为符合 ISO 8601 标准的日期字符串
  public date: string = new Date().toISOString(); // 默认值

  @IsString() // 验证该字段必须为字符串
  @Transform(({ value }: TransformFnParams) => DateService.format(String(value))) // 使用 Transform 装饰器和 DateService 来格式化日期
  public datetime!: string;

  @IsNotEmpty() // 验证该字段不能为空
  public something!: string;

  @IsNumber() // 验证该字段必须为数字
  public page = 1; // 默认值为 1
}
