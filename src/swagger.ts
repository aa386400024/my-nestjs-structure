/**
 * swagger.ts 文件用途：配置并启动 Swagger 文档服务。
 * 本文件通过定义 bootstrap 函数，使用 NestJS 的 SwaggerModule 来配置和启动 Swagger 文档服务。
 * Swagger 文档服务为应用提供了一个交互式的 API 文档界面，使得开发者和前端工程师能够更方便地了解和测试 API。
 *
 * 通过配置 DocumentBuilder，可以自定义 Swagger 文档的标题、描述、版本等信息，并且还可以配置认证方式。
 * 启动应用后，Swagger 文档默认在 '/api' 路径下提供服务。
 *
 * 更多关于 NestJS 中使用 Swagger 的信息，请参考官方文档：
 * https://docs.nestjs.com/recipes/swagger
 */

import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create(AppModule); // 创建 NestJS 应用实例

  // 配置 Swagger 文档选项
  const options = new DocumentBuilder()
    .setTitle('OpenAPI Documentation') // 设置文档标题
    .setDescription('The sample API description') // 设置文档描述
    .setVersion('1.0') // 设置文档版本
    .addBearerAuth() // 添加认证方式
    .build();
  const document = SwaggerModule.createDocument(app, options); // 创建 Swagger 文档
  SwaggerModule.setup('api', app, document); // 设置 Swagger 文档的访问路径

  await app.listen(process.env.PORT || 8000); // 启动应用，监听端口

  return app.getUrl(); // 返回应用的 URL
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap(); // 启动应用并获取 URL
    NestLogger.log(url, 'Bootstrap'); // 记录启动日志
  } catch (error) {
    NestLogger.error(error, 'Bootstrap'); // 记录启动错误日志
  }
})();
