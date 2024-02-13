// 该文件定义了DebugModule模块，它是一个NestJS动态模块，用于集成调试功能到NestJS应用中。
// 通过继承ConfigurableModuleClass，并重写forRoot方法，DebugModule支持接收配置选项，
// 并根据这些选项动态地配置模块。这个模块在非生产环境下会自动引入DiscoveryModule和DebugExplorer，
// 以支持调试功能的发现和应用。这样的设计使得开发者可以在开发环境中利用强大的调试工具，
// 而在生产环境中则不会影响应用的性能和安全性。

import { Module, DynamicModule } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { DebugExplorer } from './debug.explorer';
import { ConfigurableModuleClass, OPTIONS_TYPE } from './debug.module-definition';

@Module({})
export class DebugModule extends ConfigurableModuleClass {
  public static override forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const module = super.forRoot(options);

    // 在非生产环境下，添加DiscoveryModule和DebugExplorer以支持调试功能。
    if (process.env.NODE_ENV !== 'production') {
      (module.imports ||= []).push(DiscoveryModule);
      (module.providers ||= []).push(DebugExplorer);
    }

    return module;
  }
}
