// simple.service.ts 文件用途：提供与 Simple 实体相关的业务逻辑处理。
// 这包括创建、读取（查询单个记录）、查找（查询多个记录）和删除 Simple 实体的操作。
// 服务类使用了依赖注入来获取所需的资源，例如数据库存储库和日志记录器。

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { UtilService } from '../../common';
import type { SimpleInput, SimpleArgs } from '../dto';
import { Simple } from '../models';

@Injectable()
export class SimpleService {
  constructor(
    @InjectPinoLogger(SimpleService.name) private readonly logger: PinoLogger, // 日志记录器，用于记录服务操作的日志
    @InjectRepository(Sampletable1) private sampletable: Repository<Sampletable1>, // 数据库存储库，用于操作 Sampletable1 实体
    private util: UtilService, // 工具服务，提供一些辅助功能
  ) {}

  public async create(data: SimpleInput): Promise<Simple> {
    this.logger.info('create'); // 记录创建操作的日志

    return this.sampletable.save(data); // 将数据保存到数据库
  }

  public async read(id: number): Promise<Simple | null> {
    this.logger.info('read'); // 记录读取操作的日志

    const row = await this.sampletable.findOneBy({ id }); // 从数据库查询单个记录
    if (!row) {
      return null;
    }

    return Object.assign(new Simple(), row, { createdAt: row.created_at }); // 将查询结果转换为 Simple 对象
  }

  public async find(args: SimpleArgs): Promise<Simple[]> {
    this.logger.info('find'); // 记录查找操作的日志

    const result = await this.sampletable.find(
      this.util.removeUndefined({
        title: args.title,
        content: args.content,
      }), // 从数据库查询多个记录
    );

    return result.map((row: Sampletable1) => Object.assign(new Simple(), row, { createdAt: row.created_at })); // 将查询结果转换为 Simple 对象数组
  }

  public async remove(id: number): Promise<boolean> {
    this.logger.info('remove'); // 记录删除操作的日志

    const result = await this.sampletable.delete(id); // 从数据库删除记录

    return !!result.affected; // 返回操作是否成功
  }
}
