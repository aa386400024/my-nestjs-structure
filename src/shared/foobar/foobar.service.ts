/**
 * foobar.service.ts 文件用途：提供 Foobar 相关的业务逻辑处理。
 * 本服务类演示了如何通过依赖注入 TypeORM 的 Repository 来访问和操作数据库。
 * 主要功能是查询 Sampletable1 实体的数据，并提供了一个方法 getFoobars 来获取这些数据。
 *
 * 通过这种方式，服务类将数据访问逻辑封装起来，提供了清晰的接口给其他部分的应用使用，
 * 有助于实现业务逻辑与数据访问逻辑的分离。
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1'; // 导入 TypeORM 实体

@Injectable() // 标记为可注入的服务
export class FoobarService {
  constructor(
    @InjectRepository(Sampletable1)
    private sampletable1: Repository<Sampletable1>, // 通过依赖注入获取 Sampletable1 的 Repository
  ) {}

  /**
   * 获取 Foobars 数据。
   * 本方法演示了如何使用 Repository 的 find 方法来查询数据库。
   * @returns 返回一个 Promise，解析为 Sampletable1 实体数组。
   */
  public async getFoobars(): Promise<Sampletable1[]> {
    return this.sampletable1.find({ take: 10 }); // 查询前 10 条记录
  }
}
