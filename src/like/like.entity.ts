import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  like_id: number;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  comment: Comment;

  @ManyToOne(() => Article, (article) => article.likes)
  article: Article;

  @ManyToOne(() => User, (user) => user.likes)
  author: User;
}
