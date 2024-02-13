// 该文件定义了Sampletable2实体，对应于数据库中的`sampletable2`表。
// 类似于sampletable1实体，这里使用TypeORM装饰器来映射类属性到数据库表的列。
// 这包括主键列、字符串列、文本列和时间戳列。通过这种映射，应用能够以类型安全的方式进行数据库操作，
// 包括但不限于插入、查询、更新和删除操作。这个实体类是操作`sampletable2`表的基础，
// 并且可以在服务或控制器中被注入和使用，以实现业务逻辑。

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sampletable2')
export class Sampletable2 {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 255, name: 'title' })
  title!: string;

  @Column('text', { nullable: true, name: 'content' })
  content?: string;

  @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updated_at!: Date;

  @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  created_at!: Date;
}
