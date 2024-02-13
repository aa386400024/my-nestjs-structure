// sample.controller.ts 文件用途：演示各种类型的 HTTP 请求处理。
// 该控制器提供了多个路由处理器，用于处理 GET 和 POST 请求，包括查询参数、路径参数、请求体的处理，
// 以及如何使用服务进行数据库查询等。它还演示了如何使用守卫（Guard）和角色来控制访问权限。

import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import type { Sampletable1 } from '#entity/sampledb1';
import { Roles, RolesGuard, ConfigService } from '../../common';
import { FoobarService } from '../../shared/foobar';
import { SampleDto } from '../dto';
import { DatabaseService } from '../providers';

/**
 * route /test/sample/*
 */
@UseGuards(RolesGuard) // 使用 RolesGuard 守卫来控制访问权限
@Controller('sample') // 定义路由前缀为 /sample
export class SampleController {
  constructor(
    @InjectPinoLogger(SampleController.name) private readonly logger: PinoLogger, // 注入日志服务
    private config: ConfigService, // 注入配置服务
    private dbquery: DatabaseService, // 注入数据库服务
    private foobarService: FoobarService, // 注入共享服务
  ) {}

  @Get() // 定义 GET 方法的路由，返回配置信息
  // http://localhost:3000/test/sample
  public sample(): Record<string, unknown> {
    this.logger.info('this is sample');

    return {
      hello: this.config.get('hello'),
      foo: this.config.get('foo'),
    };
  }

  @Get('hello') // 定义 GET 方法的路由，返回请求的 URL
  // http://localhost:3000/test/sample/hello
  public hello(@Req() req: Request, @Res() res: Response): void {
    res.json({
      message: req.originalUrl,
    });
  }

  @Get('hello/query') // 定义 GET 方法的路由，处理查询参数
  // http://localhost:3000/test/sample/hello/query?name=anything
  public helloQuery(@Query('name') name: string): string {
    if (!name) {
      throw new BadRequestException('InvalidParameter');
    }

    return `helloQuery: ${name}`;
  }

  @Get('hello/param/:name') // 定义 GET 方法的路由，处理路径参数
  // http://localhost:3000/test/sample/hello/param/anything
  public helloParam(@Param('name') name: string): string {
    return `helloParam: ${name}`;
  }

  @Get('hello/number/:foo') // 定义 GET 方法的路由，处理路径参数和查询参数
  // http://localhost:3000/test/sample/hello/number/123?bar=456&blah=789
  public helloNumber(@Param('foo') foo: number, @Query('bar') bar: string, @Query('blah', ParseIntPipe) blah: number): AnyObject {
    return { foo, bar, blah };
  }

  @Post('hello/body') // 定义 POST 方法的路由，处理请求体
  // http://localhost:3000/test/sample/hello/body
  public helloBody(@Body() param: SampleDto): string {
    return `helloBody: ${JSON.stringify(param)}`;
  }

  @Get('database') // 定义 GET 方法的路由，演示数据库查询
  public async database(): Promise<Sampletable1[]> {
    // this.dbquery.sample2();
    // this.dbquery.sample3();
    return this.dbquery.sample1();
  }

  @Get('foobars') // 定义 GET 方法的路由，演示使用共享服务进行数据库查询
  public async foobars(): Promise<Sampletable1[]> {
    return this.foobarService.getFoobars();
  }

  @Roles('admin') // 使用 @Roles 装饰器指定需要 'admin' 角色
  @Get('admin') // 定义 GET 方法的路由，仅限 'admin' 角色访问
  // http://localhost:3000/test/sample/admin
  public admin(): string {
    return 'Need admin role';
  }
}
