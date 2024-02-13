// 该文件定义了`DebugExplorer`类，负责探索和应用调试装饰器到NestJS应用中的各个部分。
// 它通过NestJS的`DiscoveryService`来发现应用中的控制器和提供者，并根据配置应用调试装饰器。
// 这使得开发者可以灵活地为应用的不同部分添加调试功能，提高开发和调试的效率。

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable, Type } from '@nestjs/common';
import { MODULE_METADATA } from '@nestjs/common/constants';
import { DiscoveryService, Reflector } from '@nestjs/core';
import type { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { DebugLog } from './debug-log.decorator';
import { DEBUG_METADATA } from './debug.constant';
import type { DebugModuleOptions, DebugOptions, Metatype } from './debug.interface';
import { MODULE_OPTIONS_TOKEN } from './debug.module-definition';

@Injectable()
export class DebugExplorer {
  private exclude = new Set<string>(['Logger', 'ConfigService']);

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: DebugModuleOptions,
    private discoveryService: DiscoveryService,
    private reflector: Reflector,
  ) {
    this.addExcludeOption();

    const instanceWrappers: InstanceWrapper[] = [...this.discoveryService.getControllers(), ...this.discoveryService.getProviders()];

    for (const wrapper of instanceWrappers.filter((wrap: InstanceWrapper) => !wrap.isNotMetatype)) {
      const { instance, metatype } = wrapper;
      if (!instance || !Object.getPrototypeOf(instance)) {
        continue;
      }

      const metadata = this.reflector.get<DebugOptions | undefined>(DEBUG_METADATA, metatype);
      if (!metadata) {
        continue;
      }

      this.applyDecorator(metatype, metadata);
    }
  }

  private addExcludeOption(): void {
    if (!Array.isArray(this.options.exclude)) {
      return;
    }

    this.options.exclude.forEach((type: string) => this.exclude.add(type));
  }

  private applyDecorator(metatype: Metatype, metadata: DebugOptions): void {
    const instanceMetatypes: Type[] = [
      ...(this.reflector.get(MODULE_METADATA.CONTROLLERS, metatype) || []),
      ...(this.reflector.get(MODULE_METADATA.PROVIDERS, metatype) || []),
    ];

    for (const meta of instanceMetatypes) {
      if (typeof meta !== 'function' || this.exclude.has(meta.name) || metadata.exclude?.includes(meta)) {
        continue;
      }

      this.exclude.add(meta.name);
      DebugLog(metadata.context)(meta);
    }

    const imports = this.reflector.get<Type[] | undefined>('imports', metatype) ?? [];
    for (const module of imports) {
      this.applyDecorator(module, metadata);
    }
  }
}
