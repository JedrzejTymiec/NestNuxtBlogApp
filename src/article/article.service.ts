import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
  ) {}

  async create({ title, body }, id): Promise<any> {
    return this.articleRepo.insert({
      title: title,
      body: body,
      author: id,
    });
  }

  async getAllDescByDate(): Promise<Article[]> {
    return this.articleRepo.find({
      order: {
        post_date: 'DESC',
      },
      relations: ['author', 'comments', 'likes'],
    });
  }

  async getById(id): Promise<Article> {
    return this.articleRepo.findOne(id, {
      relations: ['author', 'comments', 'likes'],
    });
  }

  async update(articleId, data, userId): Promise<any> {
    const article = await this.getById(articleId);
    if (!article) {
      throw new BadRequestException('Article not found');
    }
    if (article.author.user_id !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.articleRepo.update(articleId, data);
  }
}
