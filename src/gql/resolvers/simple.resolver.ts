// simple.resolver.ts 文件用途：提供与 Simple 实体相关的 GraphQL 解析器。
// 这包括处理查询（Query）和变更（Mutation）操作，如创建、读取、查找和删除 Simple 实体。
// 解析器使用了守卫（Guard）来实现认证和授权，确保操作的安全性。

import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { JwtAuthGuard } from '../../auth';
import { ReqUser, Roles, RolesGuard } from '../../common';
import { SimpleInput, SimpleArgs } from '../dto';
import { Simple, Payload } from '../models';
import { SimpleService } from '../providers';

@Resolver(() => Simple) // 使用 @Resolver 装饰器定义 GraphQL 解析器
export class SimpleResolver {
  constructor(
    @InjectPinoLogger(SimpleService.name) private readonly logger: PinoLogger, // 日志记录器，用于记录解析器操作的日志
    private simpleService: SimpleService, // SimpleService，提供与 Simple 实体相关的业务逻辑处理
  ) {}

  @Query(() => Payload) // 定义一个查询操作，返回当前用户信息
  @UseGuards(JwtAuthGuard, RolesGuard) // 使用守卫实现认证和授权
  @Roles('test') // 指定需要的角色为 'test'
  public user(@ReqUser() user: Payload): Payload {
    // 从请求中获取当前用户信息
    this.logger.info('user');

    return user;
  }

  @Mutation(() => Simple) // 定义一个变更操作，用于创建 Simple 实体
  public async create(@Args('simpleData') simpleData: SimpleInput): Promise<Simple> {
    this.logger.info('create');

    return this.simpleService.create(simpleData); // 调用 SimpleService 的 create 方法
  }

  @Query(() => Simple) // 定义一个查询操作，用于读取 Simple 实体
  public async read(@Args('id', { type: () => ID }) id: number): Promise<Simple> {
    this.logger.info('read');

    const simple = await this.simpleService.read(id);
    if (!simple) {
      throw new NotFoundException('NotFoundData'); // 如果未找到数据，抛出 NotFoundException
    }

    return simple;
  }

  @Query(() => [Simple]) // 定义一个查询操作，用于查找多个 Simple 实体
  public async find(@Args() simpleArgs: SimpleArgs): Promise<Simple[]> {
    this.logger.info('find');

    return this.simpleService.find(simpleArgs); // 调用 SimpleService 的 find 方法
  }

  @Mutation(() => Boolean) // 定义一个变更操作，用于删除 Simple 实体
  public async remove(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    this.logger.info('remove');

    return this.simpleService.remove(id); // 调用 SimpleService 的 remove 方法
  }
}
