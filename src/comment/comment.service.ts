import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    private articleService: ArticleService,
  ) {}

  async add(userId, articleId, { body }): Promise<any> {
    const article = await this.articleService.getById(articleId);
    if (!article) {
      throw new BadRequestException('Article not found');
    }
    return this.commentRepo.insert({
      body: body,
      author: userId,
      article: articleId,
    });
  }

  async getAllByArticle(articleId): Promise<Comment[]> {
    const article = await this.articleService.getById(articleId);
    if (!article) {
      throw new BadRequestException('Article not found');
    }
    return this.commentRepo.find({
      where: {
        article: articleId,
      },
      relations: ['author'],
      order: {
        comment_date: 'DESC',
      },
    });
  }

  async getById(id): Promise<Comment> {
    return this.commentRepo.findOne(id, {
      relations: ['author'],
    });
  }

  async updateById(commentId, userId, data): Promise<any> {
    const comment = await this.getById(commentId);
    if (!comment) {
      throw new BadRequestException('Comment not found');
    }
    if (comment.author.user_id !== userId) {
      throw new UnauthorizedException();
    }
    return this.commentRepo.update(commentId, data);
  }

  async deleteById(commentId, userId): Promise<void> {
    const comment = await this.getById(commentId);
    if (!comment) {
      throw new BadRequestException('Comment not found');
    }
    if (comment.author.user_id !== userId) {
      throw new UnauthorizedException();
    }
    await this.commentRepo.remove(comment);
  }
}
