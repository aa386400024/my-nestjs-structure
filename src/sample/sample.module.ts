/**
 * sample.module.ts 文件用途：定义示例模块。
 * 本模块示例了如何在 NestJS 应用中组织模块，包括如何注册控制器和服务提供者，
 * 以及如何导入其他模块和 TypeORM 实体。
 *
 * 该模块通过 TypeOrmModule.forFeature 方法导入了 Sampletable1 和 Sampletable2 实体，
 * 使得这些实体在模块的服务提供者中可用。此外，它还导入了 FoobarModule，展示了模块间的依赖关系。
 *
 * controllers 和 providers 的注册使用了 JavaScript 的 Object.values 方法来自动导入所有导出的成员，
 * 这种方式简化了模块定义，使得新增控制器和服务提供者时无需修改模块文件。
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { Sampletable2 } from '#entity/sampledb2';
import * as controllers from './controllers';
import * as providers from './providers';
import { FoobarModule } from '../shared/foobar';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // ...Object.values(tables)
      // 导入 TypeORM 实体
      Sampletable1,
      Sampletable2,
    ]),
    FoobarModule, // 导入共享模块
  ],
  controllers: Object.values(controllers), // 自动注册所有控制器
  providers: Object.values(providers), // 自动注册所有服务提供者
})
export class SampleModule {}
