// 该文件定义了配置相关的TypeScript接口。它为应用的配置系统提供了类型定义，
// 包括默认配置、生产环境配置以及一个通用的配置对象类型。这些类型定义有助于确保配置的一致性和类型安全，
// 并且使得在编写配置相关的代码时能够获得更好的类型提示和编译时检查。

import type { config as base } from './envs/default'; // 导入默认环境的配置类型。
import type { config as production } from './envs/production'; // 导入生产环境的配置类型。

export type Objectype = Record<string, unknown>; // 定义一个通用的对象类型，用于配置对象的类型定义。
export type Default = typeof base; // 定义默认配置的类型，基于默认环境配置的结构。
export type Production = typeof production; // 定义生产环境配置的类型，基于生产环境配置的结构。
export type Config = Default & Production; // 定义一个综合的配置类型，结合了默认配置和生产环境配置的类型。
