import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';
import { Like } from 'src/like/like.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column('text')
  body: string;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  comment_date: string;

  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];
}
