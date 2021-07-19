import {
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('article/:article_id')
  @UseGuards(JwtGuard)
  async likeArt(@Param('article_id') id, @Request() req): Promise<any> {
    return this.likeService.likeArticle(id, req.user.id);
  }

  @Delete('article/:article_id')
  @UseGuards(JwtGuard)
  async unlikeArt(@Param('article_id') id, @Request() req): Promise<any> {
    return this.likeService.unlikeArticle(id, req.user.id);
  }

  @Post('comment/:comment_id')
  @UseGuards(JwtGuard)
  async likeCom(@Param('comment_id') id, @Request() req): Promise<any> {
    return this.likeService.likeComment(id, req.user.id);
  }

  @Delete('comment/:comment_id')
  @UseGuards(JwtGuard)
  async unlikeCom(@Param('comment_id') id, @Request() req): Promise<any> {
    return this.likeService.unlikeComment(id, req.user.id);
  }
}
