export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql', // 数据库类型，默认为'mysql'，可以通过环境变量DB_TYPE进行配置。
    synchronize: false, // 是否自动同步数据库模型到数据库，开发环境建议关闭以避免意外修改数据库结构。
    logging: true, // 开启数据库操作日志，有助于开发时监控和调试SQL查询。
    host: process.env.DB_HOST || '127.0.0.1', // 数据库主机，默认为'127.0.0.1'，可以通过环境变量DB_HOST进行配置。
    port: process.env.DB_PORT || 3306, // 数据库端口，默认为3306，可以通过环境变量DB_PORT进行配置。
    username: process.env.DB_USER || 'username', // 数据库用户名，默认为'username'，可以通过环境变量DB_USER进行配置。
    password: process.env.DB_PASSWORD || 'password', // 数据库密码，默认为'password'，可以通过环境变量DB_PASSWORD进行配置。
    database: process.env.DB_NAME || 'dbname', // 数据库名称，默认为'dbname'，可以通过环境变量DB_NAME进行配置。
    extra: {
      connectionLimit: 10, // 数据库连接池的连接限制，默认为10。
    },
    autoLoadEntities: true, // 自动加载实体，这样就不需要在模块中手动添加每个实体。
  },
  foo: 'dev-bar', // 示例配置项，表示在开发环境下的特定配置，你可以根据需要添加更多配置项。
};
