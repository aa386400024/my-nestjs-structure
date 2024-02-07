# NestJS项目结构

基于Node.js框架NestJS的项目结构。
> 起始于此问题：[nestjs/nest#2249](https://github.com/nestjs/nest/issues/2249#issuecomment-494734673)

## 替代方案

如果你关注模块的性能或特性，可以考虑：

- 使用[Fastify](https://docs.nestjs.com/techniques/performance)代替`Express`
- 使用[Prisma](https://docs.nestjs.com/recipes/prisma)或[Sequelize](https://docs.nestjs.com/techniques/database#sequelize-integration)代替`TypeORM`
- 使用[SWC](https://docs.nestjs.com/recipes/swc#swc)代替`TypeScript编译器`
- 使用[Vitest](https://docs.nestjs.com/recipes/swc#vitest)代替`Jest`

查看[nestjs-project-performance](https://github.com/CatsMiaow/nestjs-project-performance)仓库获取使用这些替代方案的示例。

## 配置

1. 创建一个`.env`文件
    - 将[.env.sample](.env.sample)文件重命名为`.env`。
2. 编辑环境配置
    - 编辑[src/config](src/config)文件夹中的文件。
    - 包括`default`、`development`、`production`、`test`环境。

## 安装

```sh
# 1. node_modules
npm ci
# 如果npm < v7或Node.js <= v14
npm i
# 从现有实体同步数据库
npm run entity:sync
# 从现有数据库导入实体
npm run entity:load
```

如果你在`entity:load`中使用多个数据库，请[修改它们](bin/entity.ts#L47-L48)。

## 开发

```sh
npm run start:dev
# https://docs.nestjs.com/recipes/repl
npm run start:repl
```

访问[http://localhost:3000](http://localhost:3000)

## 测试

```sh
npm test # 排除e2e测试
npm run test:e2e
```

## 生产

```sh
npm run lint
npm run build
# 自定义环境变量
# NODE_ENV=production PORT=8000 NO_COLOR=true node dist/app
node dist/app
# 或
npm start
```

## 文件夹

```js
+-- bin // 自定义任务
+-- dist // 源代码构建
+-- public // 静态文件
+-- src
|   +-- config // 环境配置
|   +-- entity // TypeORM实体
|   +-- auth // 认证
|   +-- common // 全局Nest模块
|   |   +-- constants // 常量值和枚举
|   |   +-- controllers // Nest控制器
|   |   +-- decorators // Nest装饰器
|   |   +-- dto // DTO（数据传输对象）模式，验证
|   |   +-- filters // Nest过滤器
|   |   +-- guards // Nest守卫
|   |   +-- interceptors // Nest拦截器
|   |   +-- interfaces // TypeScript接口
|   |   +-- middleware // Nest中间件
|   |   +-- pipes // Nest管道
|   |   +-- providers // Nest提供者
|   |   +-- * // 模型，仓库，服务...
|   +-- shared // 共享Nest模块
|   +-- gql // GraphQL结构
|   +-- * // 其他Nest模块，非全局，与上面的common结构相同
+-- test // Jest测试
+-- typings // 模块和全局类型定义

// 模块结构
// 根据模块规模添加文件夹。如果规模小，不需要添加文件夹。
+-- src/greeter
|   +-- * // 文件夹
|   +-- greeter.constant.ts
|   +-- greeter.controller.ts
|   +-- greeter.service.ts
|   +-- greeter.module.ts
|   +-- greeter.*.ts
|   +-- index.ts
```

## 实现

- 查看[bootstrap](src/app.ts)，[app.module](src/app.module.ts)
  - 数据库，模块路由，静态文件，验证，Pino日志
- [全局异常过滤器](src/common/filters/exceptions.filter.ts)
- [全局日志上下文中间件](src/common/middleware/logger-context.middleware.ts)
- 使用nestjs-pino的[自定义日志](src/config/logger.config.ts)
- [自定义装饰器](src/debug)在Nest级别的示例
- [配置](src/config)
- [认证](src/auth) - 使用Passport的JWT和会话登录
- [基于角色的守卫](src/common/guards/roles.guard.ts)
- 控制器路由
  - [认证登录](src/base/controllers/auth.controller.ts)
  - [示例](src/sample/controllers/sample.controller.ts)参数和[DTO](src/sample/dto/sample.dto.ts)
  - [CRUD API](src/sample/controllers/crud.controller.ts)示例
- [数据库查询](src/sample/providers/database.service.ts)示例
- [单元测试](src/sample/providers/crud.service.spec.ts)
- [E2E测试](test/e2e)
- [共享模块](src/shared)示例
- [GraphQL结构](src/gql)示例

## 文档

```sh
# 应用，Compodoc
npm run doc #> http://localhost:8080
# API，Swagger - src/swagger.ts
npm run doc:api #> http://localhost:8000/api
```

### 类文件命名

```ts
export class PascalCaseSuffix {} //= pascal-case.suffix.ts
// 除了后缀，PascalCase转换为连字符命名
class FooBarNaming {} //= foo-bar.naming.ts
class FooController {} //= foo.controller.ts
class BarQueryDto {} //= bar-query.dto.ts
```

### 接口命名

```ts
// https://stackoverflow.com/questions/541912
// https://stackoverflow.com/questions/2814805
interface User {}
interface CustomeUser extends User {}
interface ThirdCustomeUser extends CustomeUser {}
```

### 索引导出

```diff
#

 建议在每个文件夹中放置index.ts并导出。
# 除非是特殊情况，否则应该从文件夹而不是直接从文件导入。
- import { FooController } from './controllers/foo.controller';
- import { BarController } from './controllers/bar.controller';
+ import { FooController, BarController } from './controllers';
# 我偏好的方法是在路径的末尾只放置一个文件或文件夹名称。
- import { UtilService } from '../common/providers/util.service';
+ import { UtilService } from '../common';
```

#### 循环依赖

<https://docs.nestjs.com/fundamentals/circular-dependency>

```diff
# 不要使用以点结束的路径。
- import { FooService } from '.';
- import { BarService } from '..';
+ import { FooService } from './foo.service';
+ import { BarService } from '../providers';
```

### 变量命名

> 参考[命名速查表](https://github.com/kettanaito/naming-cheatsheet)

### 链接

- [更好的Nodejs项目](https://github.com/CatsMiaow/better-nodejs-project)
- [使用npm Workspaces的Monorepo](https://github.com/CatsMiaow/node-monorepo-workspaces)
- [Nest项目性能](https://github.com/CatsMiaow/nestjs-project-performance)
- [NestJS](https://docs.nestjs.com)
  - [Nest示例](https://github.com/nestjs/nest/tree/master/sample)
  - [Awesome Nest](https://github.com/nestjs/awesome-nestjs)
- [TypeORM](https://typeorm.io)