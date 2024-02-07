// 该文件负责配置和应用全局中间件。在NestJS应用中，中间件用于执行各种任务，如请求压缩、安全性增强、会话管理等。
// 通过在这个文件中配置中间件，我们可以确保这些功能在全局范围内生效，为整个应用提供服务。

import type { INestApplication } from '@nestjs/common';
import compression from 'compression'; // 引入compression中间件，用于压缩HTTP响应。
import session from 'express-session'; // 引入express-session中间件，用于会话管理。
import helmet from 'helmet'; // 引入helmet中间件，用于增强应用的安全性。
import passport from 'passport'; // 引入passport中间件，用于身份验证。

export function middleware(app: INestApplication): INestApplication {
  const isProduction = process.env.NODE_ENV === 'production'; // 判断当前是否为生产环境。

  app.use(compression()); // 应用压缩中间件，压缩所有传出的响应。

  app.use(
    session({
      // 生产环境中需要设置'store'来存储会话。
      secret: 'tEsTeD', // 会话密钥，用于签名会话ID cookie。在生产环境中应该使用一个随机值。
      resave: false, // 不重新保存会话。
      saveUninitialized: true, // 保存新会话。
      cookie: { secure: isProduction }, // 生产环境中，设置cookie仅通过HTTPS传输。
    }),
  );

  app.use(passport.initialize()); // 初始化Passport中间件。
  app.use(passport.session()); // 应用Passport会话中间件。
  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-1012913186
  app.use(
    helmet({
      // 配置Helmet中间件，增强应用的安全性。
      // 在生产环境中启用内容安全策略和跨源嵌入者策略，开发环境中可能需要禁用以支持某些功能。
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction ? undefined : false,
    }),
  );

  // app.enableCors(); // 如果需要，可以启用CORS。

  return app; // 返回配置后的应用实例。
}
