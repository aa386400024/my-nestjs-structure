// 该文件负责整合应用的配置信息。它首先加载默认配置，然后根据当前的NODE_ENV环境变量，
// 加载对应环境的配置（如开发、生产或测试环境的配置），并将这些配置合并。
// 这种方式允许我们为不同的环境提供特定的配置，同时保留共通的默认配置。

import type { Config, Default, Objectype, Production } from './config.interface';

const util = {
  // 判断一个值是否为对象（排除数组）。
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  // 深度合并两个对象。
  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }

    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  // 异步导入默认配置。
  const { config } = <{ config: Default }>await import(`${__dirname}/envs/default`);
  // 根据环境变量NODE_ENV异步导入对应环境的配置，如果NODE_ENV未设置，默认为'development'。
  const { config: environment } = <{ config: Production }>await import(`${__dirname}/envs/${process.env.NODE_ENV || 'development'}`);

  // 使用util.merge方法深度合并默认配置和环境特定配置。
  return util.merge(config, environment);
};
