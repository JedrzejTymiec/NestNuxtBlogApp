import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':article_id')
  @UseGuards(JwtGuard)
  async create(
    @Body() commentDto: CommentDto,
    @Request() req,
    @Param('article_id') id,
  ): Promise<any> {
    return this.commentService.add(req.user.id, id, commentDto);
  }

  @Get(':article_id')
  async getArticle(@Param('article_id') id): Promise<Comment[]> {
    return this.commentService.getAllByArticle(id);
  }
}
