// gql.module.ts 文件用途：配置和初始化 GraphQL 相关的设置和服务。
// 该模块使用 ApolloDriver 作为 GraphQL 服务的驱动，通过 GraphQLModule.forRootAsync 方法异步配置 GraphQL 模块。
// 它还注册了 TypeOrmModule.forFeature 方法，以便能够在 GraphQL 服务中使用 TypeORM 进行数据库操作。
// 此外，该模块还提供了 SimpleResolver、SimpleService 和 DateScalar，作为 GraphQL API 的一部分。

import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '#entity/sampledb1'; // 引入数据库实体
import { SimpleService } from './providers'; // 引入服务提供者
import { SimpleResolver } from './resolvers'; // 引入 GraphQL 解析器
import { DateScalar } from './scalars'; // 引入自定义 GraphQL 标量类型

/**
 * https://docs.nestjs.com/graphql/quick-start
 */
@Module({
  imports: [
    // 异步配置 GraphQL 模块，使用 ApolloDriver 作为驱动
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => ({
        ...config.get<GqlModuleOptions>('graphql'), // 从配置服务中获取 GraphQL 相关配置
      }),
      inject: [ConfigService], // 注入配置服务
    }),
    TypeOrmModule.forFeature([Sampletable1]), // 注册 TypeORM 模块，以便在 GraphQL 服务中使用
  ],
  providers: [SimpleResolver, SimpleService, DateScalar], // 注册提供者，包括解析器、服务和自定义标量
})
export class GqlModule {}
