// 该文件使用NestJS的ConfigurableModuleBuilder构建一个可配置的模块定义。
// 这种方式允许开发者在导入模块时提供自定义配置，从而增加了模块使用的灵活性。
// 通过定义ConfigurableModuleClass和MODULE_OPTIONS_TOKEN，它支持在模块根配置中传递DebugModuleOptions类型的配置选项，
// 使得开发者可以在应用的不同部分灵活地使用调试功能，根据需要配置调试行为。

import { ConfigurableModuleBuilder } from '@nestjs/common';

import type { DebugModuleOptions } from './debug.interface';

// 使用ConfigurableModuleBuilder构建调试模块的定义，允许通过forRoot静态方法传递配置。
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } = new ConfigurableModuleBuilder<DebugModuleOptions>()
  .setClassMethodName('forRoot')
  .build();
