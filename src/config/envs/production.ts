// 该文件定义了生产环境下的配置。在生产环境中，通常需要更加关注性能和安全性，
// 因此与开发环境相比，某些配置项会有所不同，如数据库日志记录通常会关闭，
// 并且可能会使用数据库复制来提高数据的可用性和负载均衡。

export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql', // 数据库类型，默认为'mysql'，可以通过环境变量DB_TYPE进行配置。
    synchronize: false, // 生产环境中关闭自动同步数据库模型，以防止意外更改数据库结构。
    logging: false, // 生产环境中关闭数据库操作日志，以提高性能和安全性。
    replication: {
      // 数据库复制配置，用于设置主从复制提高数据的可用性和负载均衡。
      master: {
        // 主数据库配置。
        host: process.env.DB_HOST || 'masterHost', // 主数据库主机，可以通过环境变量DB_HOST进行配置。
        port: process.env.DB_PORT || 3306, // 主数据库端口，可以通过环境变量DB_PORT进行配置。
        username: process.env.DB_USER || 'username', // 主数据库用户名，可以通过环境变量DB_USER进行配置。
        password: process.env.DB_PASSWORD || 'password', // 主数据库密码，可以通过环境变量DB_PASSWORD进行配置。
        database: process.env.DB_NAME || 'dbname', // 主数据库名称，可以通过环境变量DB_NAME进行配置。
      },
      slaves: [
        // 从数据库配置数组。
        {
          // 如有必要，请修正以下配置。
          host: 'slaveHost', // 从数据库主机。
          port: 3306, // 从数据库端口。
          username: 'username', // 从数据库用户名。
          password: 'password', // 从数据库密码。
          database: 'dbname', // 从数据库名称。
        },
      ],
    },
    extra: {
      connectionLimit: 30, // 数据库连接池的连接限制，生产环境中可能需要更多连接。
    },
    autoLoadEntities: true, // 自动加载实体，避免在模块中手动添加每个实体。
  },
  graphql: {
    debug: false, // 生产环境中关闭GraphQL调试模式。
    playground: false, // 生产环境中关闭GraphQL Playground。
  },
  foo: 'pro-bar', // 示例配置项，表示在生产环境下的特定配置，你可以根据需要添加更多配置项。
};
