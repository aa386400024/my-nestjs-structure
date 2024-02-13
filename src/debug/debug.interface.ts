// 该文件定义了与调试功能相关的接口和类型。这些定义支持在NestJS应用中配置和使用调试功能，
// 包括调试模块的选项（DebugModuleOptions）和单个调试操作的选项（DebugOptions）。
// 这些接口和类型为开发者提供了灵活的方式来定制调试行为，以适应不同的开发和调试需求。

/* eslint-disable @typescript-eslint/ban-types */
import type { Type } from '@nestjs/common';

// ClassRef 类用于表示一个类引用的类型，可以包含任意数量的Type属性。
export class ClassRef {
  [index: string]: Type;
}

// Func 类型代表一个函数。
export type Func = Function;
// Metatype 类型代表一个NestJS的类型或函数，用于在调试选项中指定要排除的类型。
export type Metatype = Type | Func;

// DebugModuleOptions 接口定义了调试模块的配置选项。
export interface DebugModuleOptions {
  exclude?: string[]; // 指定要从调试中排除的服务或控制器名称数组。
}

// DebugOptions 接口定义了单个调试操作的配置选项。
export interface DebugOptions {
  context?: string; // 提供一个上下文标识，用于区分不同的调试操作或信息。
  exclude?: Metatype[]; // 指定要从特定调试操作中排除的类型数组。
}
