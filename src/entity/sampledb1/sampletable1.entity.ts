// 该文件定义了Sampletable1实体，对应于数据库中的`sampletable1`表。
// 通过使用TypeORM的装饰器，如@Entity, @Column, 和@PrimaryGeneratedColumn，
// 我们可以将这个类与数据库表关联起来，并定义表中的列和它们的数据类型。
// 这个实体类使得在应用中操作`sampletable1`表的数据变得简单和类型安全，
// 包括创建新记录、查询记录、更新记录和删除记录等操作。

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sampletable1')
export class Sampletable1 {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 255, name: 'title' })
  title!: string;

  @Column('text', { nullable: true, name: 'content' })
  content?: string;

  @Column('simple-array')
  tags?: string[];

  @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updated_at!: Date;

  @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  created_at!: Date;
}
