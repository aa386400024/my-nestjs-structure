/**
 * ConfigService 类扩展了NestJS内置的ConfigService，提供了一个类型安全的方式来访问应用配置。
 * 它覆写了get方法，当请求的配置项不存在时，会抛出一个明确的错误，帮助开发者快速定位配置问题。
 * 这个服务利用了TypeScript的泛型和高级类型，确保在获取配置项时能够提供完整的类型提示和校验。
 * 使用这个服务可以提高应用配置管理的安全性和可维护性。
 */

// 导入NestJS的Injectable装饰器
import { Injectable } from '@nestjs/common';
// 导入NestJS config模块的ConfigService，以及Path和PathValue类型用于类型安全的配置访问
import { ConfigService as NestConfig, Path, PathValue } from '@nestjs/config';

// 导入应用的配置类型定义
import type { Config } from '../../config';

// 使用@Injectable装饰器，使得这个服务可以被NestJS的依赖注入系统管理
@Injectable()
export class ConfigService<K = Config> extends NestConfig<K> {
  // 覆写get方法，增加了对未定义配置项的检查
  public override get<P extends Path<K>>(path: P): PathValue<K, P> {
    // 使用super.get调用基类的get方法，并启用类型推断
    const value = super.get(path, { infer: true });

    // 如果获取的配置值为undefined，抛出一个错误
    if (value === undefined) {
      throw new Error(`NotFoundConfig: ${path}`);
    }

    // 返回配置值
    return value;
  }
}
