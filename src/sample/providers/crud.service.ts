/**
 * crud.service.ts 文件用途：提供 CRUD 操作的服务。
 * 该服务类封装了对 Sampletable1 实体的创建、读取、更新和删除操作，
 * 使用 TypeORM 的 Repository 接口与数据库进行交互。
 *
 * 服务类通过依赖注入的方式，将 TypeORM 的 Repository 注入到类中，
 * 使得可以直接在服务中使用 Repository 提供的方法操作数据库。
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Sampletable1)
    private table: Repository<Sampletable1>, // 注入 Sampletable1 实体的 Repository
  ) {}

  // 创建操作：接受 Sampletable1 实体的部分字段，返回创建的实体
  public async create(data: Partial<Sampletable1>): Promise<Sampletable1> {
    return this.table.save(data);
  }

  // 读取操作：通过 ID 查询单个实体，如果未找到返回 null
  public async read(id: number): Promise<Sampletable1 | null> {
    return this.table.findOneBy({ id });
  }

  // 更新操作：通过 ID 更新实体的部分字段，返回更新结果
  public async update(id: number, data: Partial<Sampletable1>): Promise<UpdateResult> {
    return this.table.update(id, data);
  }

  // 删除操作：通过 ID 删除实体，返回删除结果
  public async remove(id: number): Promise<DeleteResult> {
    return this.table.delete(id);
  }
}
