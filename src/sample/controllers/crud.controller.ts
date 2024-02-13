// crud.controller.ts 文件用途：提供 CRUD 操作的 HTTP 接口。
// 该控制器定义了创建、读取、更新和删除 Sampletable1 实体的路由处理器。
// 它使用 CrudService 服务来执行实际的数据库操作，并通过 HTTP 状态码和消息处理异常情况。

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  ParseIntPipe,
} from '@nestjs/common';

import type { Sampletable1 } from '#entity/sampledb1';
import { CreateDto, UpdateDto } from '../dto';
import { CrudService } from '../providers';

/**
 * route /test/crud/*
 */
@Controller('crud') // 定义路由前缀为 /crud
export class CrudController {
  constructor(private crud: CrudService) {} // 注入 CrudService

  @Get(':id') // 定义 GET 方法的路由，用于读取单个实体
  // GET http://localhost:3000/test/crud/:id
  public async read(@Param('id', ParseIntPipe) id: number): Promise<Sampletable1> {
    const result = await this.crud.read(id);
    if (!result) {
      throw new NotFoundException('NotFoundData'); // 如果未找到数据，抛出 NotFoundException
    }

    return result; // 返回查询到的实体
  }

  @Post() // 定义 POST 方法的路由，用于创建实体
  // POST http://localhost:3000/test/crud
  public async create(@Body() body: CreateDto): Promise<{ id: number }> {
    const result = await this.crud.create(body);
    if (!result.id) {
      throw new InternalServerErrorException('NotCreatedData'); // 如果创建失败，抛出 InternalServerErrorException
    }

    return { id: result.id }; // 返回创建的实体的 ID
  }

  @Put(':id') // 定义 PUT 方法的路由，用于更新实体
  // PUT http://localhost:3000/test/crud/:id
  public async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDto): Promise<{ success: boolean }> {
    const result = await this.crud.update(id, body);

    return { success: !!result.affected }; // 返回操作是否成功
  }

  @Delete(':id') // 定义 DELETE 方法的路由，用于删除实体
  // DELETE http://localhost:3000/test/crud/:id
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    const result = await this.crud.remove(id);

    return { success: !!result.affected }; // 返回操作是否成功
  }
}
