# 配置

<https://trilon.io/blog/announcing-nestjs-8-whats-new#template-literal-types-and-configservice>
> 随着TypeScript v4.2现在支持模板字面量类型，我们能够实现一个新的推断特性，它允许我们推断嵌套自定义配置对象属性的类型，即使是使用点符号的情况下也可以。

由于`infer`选项不是默认的，并且每次使用时都需要添加，我们通过在Nest中扩展ConfigService来将其作为默认实现。

参见`CommonModule`的[ConfigService](../common/providers/config.service.ts)

## 使用示例

参见`SampleController`的[sample](../sample/controllers/sample.controller.ts#L28-L31)方法

![示例](https://user-images.githubusercontent.com/1300172/127599201-8491e7bb-76f3-4dbc-9a62-97b6832bb882.png)