// AuthSerializer文件定义了用户序列化和反序列化的逻辑，这是实现Passport身份验证策略的一部分。
// 在NestJS中，这个过程用于确定如何将用户信息存储到session中，以及如何从session中恢复用户信息。
// 这对于实现登录会话和用户认证状态的持久化非常关键。

import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import type { Payload } from './auth.interface';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  // 用户序列化：决定哪些用户数据应该被存储在session中。
  public serializeUser(user: Payload, done: (err: Error | null, data?: Payload) => void): void {
    done(null, user); // 在这个示例中，我们直接将整个用户Payload存储在session中。
  }

  // 用户反序列化：从session中恢复用户数据时的处理逻辑。
  public deserializeUser(data: Payload, done: (err: Error | null, user?: Payload) => void): void {
    try {
      // const user = await fetchMore(); // 如果需要，可以在这里添加逻辑来从数据库或其他地方获取更多用户信息。
      done(null, data); // 在这个示例中，我们直接使用session中存储的数据作为用户信息。
    } catch (err) {
      done(<Error>err); // 如果在反序列化过程中发生错误，通过done回调传递错误对象。
    }
  }
}
