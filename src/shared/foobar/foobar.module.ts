/**
 * foobar.module.ts 文件用途：定义 Foobar 模块。
 * 本模块主要负责提供 FoobarService 服务，该服务可能包含跨应用共享的业务逻辑或数据访问逻辑。
 * 通过 TypeOrmModule.forFeature 方法，本模块还注册了 Sampletable1 实体，使得 FoobarService 能够访问和操作这个实体的数据。
 *
 * 该模块通过 exports 数组导出 FoobarService，使得其他模块在导入 FoobarModule 时能够使用 FoobarService，
 * 从而实现了服务的复用和模块间的解耦。
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '#entity/sampledb1'; // 导入 TypeORM 实体
import { FoobarService } from './foobar.service'; // 导入 Foobar 服务

@Module({
  imports: [
    TypeOrmModule.forFeature([Sampletable1]), // 注册 TypeORM 实体
  ],
  providers: [FoobarService], // 注册 FoobarService 为本模块的服务提供者
  exports: [FoobarService], // 导出 FoobarService，使其可在其他模块中使用
})
export class FoobarModule {}
