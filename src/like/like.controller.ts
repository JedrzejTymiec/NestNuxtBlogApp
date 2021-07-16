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

  @Post(':article_id')
  @UseGuards(JwtGuard)
  async create(@Param('article_id') id, @Request() req): Promise<any> {
    return this.likeService.like(id, req.user.id);
  }

  @Delete(':article_id')
  @UseGuards(JwtGuard)
  async delete(@Param('article_id') id, @Request() req): Promise<any> {
    return this.likeService.unlike(id, req.user.id);
  }
}
