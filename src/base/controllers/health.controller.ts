/**
 * HealthController 提供了一个健康检查端点，用于监控应用的运行状态。
 * 它使用NestJS的terminus模块来执行健康检查，包括数据库连接和外部HTTP服务的检查。
 * 这对于运维监控和服务自动化管理非常有用，可以快速地了解服务的健康状况。
 */

// 导入NestJS的控制器和GET请求装饰器
import { Controller, Get } from '@nestjs/common';
// 导入terminus模块的健康检查服务和指标
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

// 导入自定义的Public装饰器，用于标记路由为公开访问
import { Public } from '../../common';

// NestJS的terminus模块文档链接:https://docs.nestjs.com/recipes/terminus
@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService, // 健康检查服务
    private http: HttpHealthIndicator, // HTTP健康指标
    private db: TypeOrmHealthIndicator, // 数据库健康指标
  ) {}

  // 定义一个公开的健康检查端点
  @Public()
  @Get('health')
  @HealthCheck() // 使用HealthCheck装饰器标记这是一个健康检查操作
  public async check(): Promise<HealthCheckResult> {
    // 执行健康检查，包括HTTP服务和数据库连接的检查
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => this.http.pingCheck('dns', 'https://1.1.1.1'),
      async (): Promise<HealthIndicatorResult> => this.db.pingCheck('database'),
    ]);
  }
}
