// 该文件定义了一个自定义装饰器`Debug`，用于在NestJS应用中标记和传递调试相关的元数据。
// 通过这个装饰器，开发者可以为特定的类、方法或参数提供调试信息，如特定的调试选项。
// 这有助于在开发和调试过程中，更灵活地控制和管理调试行为。

import { SetMetadata, CustomDecorator } from '@nestjs/common';

import { DEBUG_METADATA } from './debug.constant';
import type { DebugOptions } from './debug.interface';

// 定义`Debug`装饰器，接受一个字符串或`DebugOptions`类型的参数。
// 该装饰器使用`SetMetadata`函数，将调试元数据与目标关联起来。
export const Debug = (options?: string | DebugOptions): CustomDecorator =>
  SetMetadata(DEBUG_METADATA, { context: options, ...(typeof options === 'object' && options) });
