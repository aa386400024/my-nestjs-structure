// create.dto.ts 文件用途：定义创建操作（如数据库记录）时的数据验证规则。
// 该 DTO 继承并省略了 Sampletable1 实体的 'id', 'updated_at', 和 'created_at' 字段，
// 仅包含创建记录时需要的字段和相应的验证规则。

import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

import type { Sampletable1 } from '#entity/sampledb1';

export class CreateDto implements Omit<Sampletable1, 'id' | 'updated_at' | 'created_at'> {
  @IsString() // 验证该字段必须为字符串
  public title!: string; // 标题字段，必填

  @IsOptional() // 该字段为可选
  @IsString() // 验证该字段必须为字符串，如果提供
  public content?: string; // 内容字段，可选

  @ArrayNotEmpty() // 验证数组不能为空
  @IsString({ each: true }) // 验证数组中的每个元素都必须为字符串
  public tags!: string[]; // 标签字段，必填且不能为空数组
}
