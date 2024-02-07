export const config = {
  db: {
    // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
    // 数据库配置部分，包括实体、订阅者和迁移文件的路径配置。
    // 这些行被注释掉了，如果你需要配置实体、订阅者或迁移文件，请取消注释并根据你的项目结构调整路径。
  },
  graphql: {
    debug: true, // 开启GraphQL调试模式。
    playground: {
      settings: {
        'request.credentials': 'include', // 设置GraphQL Playground中的请求凭证包含策略。
      },
    },
    autoSchemaFile: true, // 自动生成GraphQL模式文件。
    autoTransformHttpErrors: true, // 自动转换HTTP错误为GraphQL错误。
    // cors: { credentials: true }, // 配置CORS，这里被注释掉了。如果需要启用，取消注释并根据需要进行配置。
    // sortSchema: true, // 如果需要对模式进行排序，取消注释此行。
    // installSubscriptionHandlers: true, // 如果需要安装订阅处理程序，取消注释此行。
  },
  hello: 'world', // 示例配置项，你可以根据需要添加更多配置项。
  jwtSecret: process.env.JWT_SECRET, // JWT密钥，从环境变量中读取。
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET, // JWT刷新密钥，从环境变量中读取。
};
