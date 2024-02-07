// auth.interface.ts文件定义了身份验证模块中使用的接口。这些接口为JWT令牌的签发、验证和用户信息的传递提供了类型定义，
// 有助于确保身份验证流程的类型安全和清晰的数据结构。

// 定义JWT签名接口，包含访问令牌和刷新令牌。
export interface JwtSign {
  access_token: string; // 访问令牌，用于API访问认证
  refresh_token: string; // 刷新令牌，用于获取新的访问令牌
}

// 定义JWT载荷接口，包含用户标识、用户名和角色列表。
export interface JwtPayload {
  sub: string; // 用户标识，通常是用户ID
  username: string; // 用户名
  roles: string[]; // 用户角色列表
}

// 定义通用的用户信息载荷接口，用于身份验证过程中传递用户信息。
export interface Payload {
  userId: string; // 用户ID
  username: string; // 用户名
  roles: string[]; // 用户角色列表
}
