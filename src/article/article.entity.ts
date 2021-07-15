import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Like } from 'src/like/like.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  article_id: number;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.article)
  likes: Like[];
}
