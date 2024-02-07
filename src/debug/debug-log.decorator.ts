/**
 * DebugLog 装饰器用于自动记录方法执行的时间和参数，以便于开发和调试过程中监控性能和行为。
 * 它可以作为方法装饰器直接应用于类的方法上，或作为类装饰器应用于整个类，自动为所有方法添加日志记录功能。
 * 该装饰器特别适合于性能分析和问题诊断，能够帮助开发者快速定位问题所在。
 * 它通过修改方法的描述符（PropertyDescriptor），在方法执行前后插入日志记录逻辑。
 * 对于异步方法，确保日志记录在Promise解析后执行。
 */

import { Logger } from '@nestjs/common';
import { performance } from 'perf_hooks';
// Node.js v15.3.0以上版本，可以直接使用util/types中的isAsyncFunction进行判断
import { types } from 'util';

import type { Func } from './debug.interface';

// 方法装饰器，用于记录方法执行时间和参数
const MethodLog =
  (context?: string): MethodDecorator =>
  (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    const originalMethod: unknown = descriptor.value;
    if (typeof originalMethod !== 'function') {
      return; // 如果不是方法，则不进行处理
    }

    // 日志记录函数，记录方法名、参数和执行时间
    const log = function (time: number, args: unknown[]): void {
      const ownKey = typeof target === 'function' ? target.name : '';
      const name = context ? `${ownKey}.${String(propertyKey)}` : String(propertyKey);
      const params = args.length > 0 ? `(${args.toString()})` : '';

      Logger.debug(`${name}${params} +${time.toFixed(2)}ms`, context ?? ownKey);
    };

    // 根据方法是否为异步，选择不同的执行逻辑
    if (types.isAsyncFunction(originalMethod)) {
      descriptor.value = async function (...args: unknown[]): Promise<unknown> {
        const start = performance.now();
        const result: unknown = await originalMethod.apply(this, args);
        const end = performance.now();

        log(end - start, args); // 记录异步方法执行时间
        return result;
      };
    } else {
      descriptor.value = function (...args: unknown[]): unknown {
        const start = performance.now();
        const result: unknown = originalMethod.apply(this, args);
        const end = performance.now();

        log(end - start, args); // 记录同步方法执行时间
        return result;
      };
    }
  };

// 类装饰器，自动为类的每个方法添加MethodLog装饰器，除了构造函数
const ClassLog =
  (context?: string): ClassDecorator =>
  (target: Func): void => {
    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);

    for (const [propertyKey, descriptor] of Object.entries(descriptors)) {
      const originalMethod: unknown = descriptor.value;
      if (!(originalMethod instanceof Function) || propertyKey === 'constructor') {
        continue; // 跳过构造函数
      }

      MethodLog(context)(target, propertyKey, descriptor); // 应用MethodLog装饰器

      // 如果方法被修改，则保留原有的元数据
      if (originalMethod !== descriptor.value) {
        const metadataKeys = Reflect.getMetadataKeys(originalMethod);
        for (const key of metadataKeys) {
          const value: unknown = Reflect.getMetadata(key, originalMethod);
          Reflect.defineMetadata(key, value, <object>descriptor.value);
        }
      }

      Object.defineProperty(target.prototype, propertyKey, descriptor);
    }
  };

// DebugLog 装饰器，可以作为类装饰器或方法装饰器使用
export const DebugLog =
  (context?: string): ClassDecorator & MethodDecorator =>
  (target: object, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): void => {
    if (!descriptor) {
      ClassLog(context)(<Func>target); // 应用于整个类
    } else if (propertyKey) {
      MethodLog(context)(target, propertyKey, descriptor); // 应用于单个方法
    }
  };
