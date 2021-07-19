import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { ArticleService } from 'src/article/article.service';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private likeRepo: Repository<Like>,
    private articleService: ArticleService,
    private commentService: CommentService,
  ) {}

  async likeArticle(articleId, userId): Promise<any> {
    const article = await this.articleService.getById(articleId);
    if (!article) {
      throw new BadRequestException('Article not found');
    }
    const likes = await this.likeRepo.find({
      where: {
        article: articleId,
      },
      relations: ['author'],
    });
    const liked = likes.filter((like) => like.author.user_id === userId);
    if (liked.length > 0) {
      throw new BadRequestException('Article already liked');
    }
    return this.likeRepo.insert({
      article: articleId,
      author: userId,
    });
  }

  async unlikeArticle(articleId, userId): Promise<any> {
    const article = await this.articleService.getById(articleId);
    if (!article) {
      throw new BadRequestException('Article not found');
    }
    const likes = await this.likeRepo.find({
      where: {
        article: articleId,
      },
      relations: ['author'],
    });
    const liked = likes.filter((like) => like.author.user_id === userId);
    if (liked.length === 0) {
      throw new BadRequestException('Article not liked');
    }
    return this.likeRepo.remove(liked[0]);
  }

  async likeComment(commentId, userId): Promise<any> {
    const comment = await this.commentService.getById(commentId);
    if (!comment) {
      throw new BadRequestException('Comment not found');
    }
    const likes = await this.likeRepo.find({
      where: {
        comment: commentId,
      },
      relations: ['author'],
    });
    const liked = likes.filter((like) => like.author.user_id === userId);
    if (liked.length > 0) {
      throw new BadRequestException('Comment already liked');
    }
    return this.likeRepo.insert({
      comment: commentId,
      author: userId,
    });
  }

  async unlikeComment(commentId, userId): Promise<any> {
    const comment = await this.commentService.getById(commentId);
    if (!comment) {
      throw new BadRequestException('Comment not found');
    }
    const likes = await this.likeRepo.find({
      where: {
        article: commentId,
      },
      relations: ['author'],
    });
    const liked = likes.filter((like) => like.author.user_id === userId);
    if (liked.length === 0) {
      throw new BadRequestException('Comment not liked');
    }
    return this.likeRepo.remove(liked[0]);
  }

  async deleteAllByUser(id): Promise<void> {
    const likes = await this.likeRepo.find({
      where: {
        author: id,
      },
    });
    await this.likeRepo.remove(likes);
  }
}
