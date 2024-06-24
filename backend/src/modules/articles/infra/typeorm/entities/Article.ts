import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('articles')
class Article {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id ' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Article;
