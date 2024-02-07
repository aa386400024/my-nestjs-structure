// 该文件定义了测试环境下的配置。在测试环境中，配置通常旨在模拟生产环境的设置，
// 同时做出适当调整以便于测试，例如减少数据库连接池大小、关闭日志记录等，
// 以提高测试执行的速度和效率。

// export * from './development';
export const config = {
  db: {
    type: 'mysql', // 数据库类型，测试环境默认为'mysql'。
    synchronize: false, // 测试环境中关闭自动同步数据库模型，以防止测试过程中意外更改数据库结构。
    logging: false, // 测试环境中关闭数据库操作日志，以提高测试执行的速度。
    host: process.env.DB_HOST || '127.0.0.1', // 数据库主机，默认为'127.0.0.1'，可以通过环境变量DB_HOST进行配置。
    port: process.env.DB_PORT || 3306, // 数据库端口，默认为3306，可以通过环境变量DB_PORT进行配置。
    username: process.env.DB_USER || 'username', // 数据库用户名，默认为'username'，可以通过环境变量DB_USER进行配置。
    password: process.env.DB_PASSWORD || 'password', // 数据库密码，默认为'password'，可以通过环境变量DB_PASSWORD进行配置。
    database: process.env.DB_NAME || 'dbname', // 数据库名称，默认为'dbname'，可以通过环境变量DB_NAME进行配置。
    extra: {
      connectionLimit: 5, // 数据库连接池的连接限制，在测试环境中通常较小，这里默认为5。
    },
    autoLoadEntities: true, // 自动加载实体，避免在模块中手动添加每个实体。
  },
  graphql: {
    playground: false, // 测试环境中关闭GraphQL Playground。
  },
};
