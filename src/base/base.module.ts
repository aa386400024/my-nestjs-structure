/**
 * BaseModule定义了应用的基础模块，它引入了NestJS的核心功能模块，
 * 如TerminusModule用于健康检查，HttpModule用于执行HTTP请求。
 * 该模块通过自动导入src/base/controllers目录下的所有控制器，
 * 来提供应用的基础Web服务和健康检查端点。
 * 这样的设计使得基础设施相关的功能能够集中管理，便于维护和扩展。
 */

// 导入NestJS的Http模块和通用模块装饰器
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
// 导入Terminus模块，用于健康检查
import { TerminusModule } from '@nestjs/terminus';

// 从当前目录下的controllers文件夹自动导入所有控制器
import * as controllers from './controllers';

// 使用@Module装饰器定义模块的元数据
@Module({
  // 指定模块的导入项，这里导入了TerminusModule和HttpModule
  imports: [TerminusModule, HttpModule],
  // 动态导入所有控制器，使得所有控制器都成为BaseModule的一部分
  controllers: Object.values(controllers),
})
// 导出BaseModule类，使其可以在其他地方被导入和使用
export class BaseModule {}
