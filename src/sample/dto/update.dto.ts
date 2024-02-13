/**
 * update.dto.ts 文件用途：定义更新操作时的数据验证规则。
 * 该 DTO 继承了 CreateDto 类并使用了 NestJS 的映射类型（OmitType）来省略 'title' 字段，
 * 适用于那些在更新操作中不需要或不允许更新 'title' 字段的场景。
 *
 * 映射类型参考文档：
 * - NestJS 映射类型: https://github.com/nestjs/mapped-types
 * - NestJS OpenAPI 映射类型: https://docs.nestjs.com/openapi/mapped-types
 */

import { OmitType } from '@nestjs/mapped-types';
// import { OmitType } from '@nestjs/swagger';

import { CreateDto } from './create.dto';

/**
 * 使用映射类型来创建 DTOs，如 PartialType, PickType, OmitType, IntersectionType。
 * 这里使用 OmitType 来从 CreateDto 中省略 'title' 字段，创建一个用于更新操作的 DTO。
 */
export class UpdateDto extends OmitType(CreateDto, ['title']) {}
