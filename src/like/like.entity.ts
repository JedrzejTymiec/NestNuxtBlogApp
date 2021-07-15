import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  like_id: number;

  @ManyToOne(() => Article, (article) => article.likes)
  article: Article;

  @ManyToOne(() => User, (user) => user.likes)
  author: User;
}
