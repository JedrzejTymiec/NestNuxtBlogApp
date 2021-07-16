import { BadRequestException, Injectable } from '@nestjs/common';
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
    return this.commentRepo.find({
      where: {
        article: articleId,
      },
      relations: ['author'],
    });
  }
}
