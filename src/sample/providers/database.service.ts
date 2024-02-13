/**
 * database.service.ts 文件用途：演示 TypeORM 的数据库查询执行示例。
 * 该服务类展示了如何使用 TypeORM 的 Repository 和 EntityManager 进行数据操作，
 * 包括简单的数据查询、使用查询构建器进行复杂查询等。
 *
 * 服务类通过依赖注入的方式，将 TypeORM 的 Repository 和 EntityManager 注入到类中，
 * 使得可以直接在服务中使用这些对象进行数据库操作。
 *
 * 参考文档：
 * - TypeORM 工作与仓库: https://typeorm.io/#/working-with-repository
 * - TypeORM 仓库 API: https://typeorm.io/#/repository-api
 * - TypeORM 实体管理器: https://typeorm.io/#/working-with-entity-manager
 * - TypeORM 实体管理器 API: https://typeorm.io/#/entity-manager-api
 * - TypeORM 查询选项: https://typeorm.io/#/find-options
 * - TypeORM 选择查询构建器: https://typeorm.io/#/select-query-builder
 */

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { Sampletable2 } from '#entity/sampledb2';

/**
 * Database Query Execution Example
 * 数据库查询执行示例
 * 本服务类展示了如何使用 TypeORM 的 Repository 和 EntityManager 进行数据操作。
 * 包括简单的数据查询、使用查询构建器进行复杂查询等。
 */

@Injectable()
export class DatabaseService {
  private tablerepo: Repository<Sampletable1>;

  constructor(
    /**
     * Sample1
     * 使用 Repository 进行数据操作示例。
     * 需要在模块中通过 TypeOrmModule.forFeature([]) 导入实体。
     * https://typeorm.io/#/working-with-repository
     * https://typeorm.io/#/repository-api
     */
    @InjectRepository(Sampletable1)
    private sampletable1: Repository<Sampletable1>,

    /**
     * Sample2
     * 使用 EntityManager 进行数据操作示例。
     * https://typeorm.io/#/working-with-entity-manager
     * https://typeorm.io/#/entity-manager-api
     */
    @InjectEntityManager()
    private manager: EntityManager,
  ) {
    /**
     * Sample3
     * 通过 EntityManager 获取 Repository 的示例。
     * https://typeorm.io/#/entity-manager-api - getRepository
     */
    this.tablerepo = this.manager.getRepository(Sampletable1);
  }

  /**
   * 使用 Repository 进行简单查询。
   * https://typeorm.io/#/find-options
   */
  public async sample1(): Promise<Sampletable1[]> {
    return this.sampletable1.find();
  }

  /**
   * 使用 EntityManager 进行简单查询。
   */
  public async sample2(): Promise<Sampletable1[]> {
    return this.manager.find(Sampletable1);
  }

  /**
   * 使用通过 EntityManager 获取的 Repository 进行简单查询。
   */
  public async sample3(): Promise<Sampletable1[]> {
    return this.tablerepo.find();
  }

  /**
   * 使用查询构建器进行复杂查询，包括联表查询等。
   * https://typeorm.io/#/select-query-builder
   */
  public async joinQuery(): Promise<boolean> {
    // 示例查询，具体操作省略
    await this.sampletable1
      .createQueryBuilder('tb1')
      .innerJoin('sampletable2', 'tb2', 'tb2.id = tb1.id') // inner or left
      .select(['tb1', 'tb2.title'])
      .where('tb1.id = :id', { id: 123 })
      .getRawOne(); // getOne, getMany, getRawMany ...

    await this.sampletable1.createQueryBuilder('tb1').innerJoinAndSelect('sampletable2', 'tb2', 'tb2.id = tb1.id').getOne();

    await this.sampletable1.createQueryBuilder('tb1').leftJoinAndSelect(Sampletable2, 'tb2', 'tb2.id = tb1.id').getRawMany();

    await this.sampletable1.createQueryBuilder('tb1').leftJoinAndMapOne('tb1.tb2row', 'sampletable2', 'tb2', 'tb2.id = tb1.id').getOne();

    await this.sampletable1.createQueryBuilder('tb1').leftJoinAndMapMany('tb1.tb2row', Sampletable2, 'tb2', 'tb2.id = tb1.id').getMany();

    return true;
  }
}
