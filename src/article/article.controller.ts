import {
  Get,
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @UseGuards(JwtGuard)
  async add(@Body() articleDto: ArticleDto, @Request() req): Promise<any> {
    return this.articleService.create(articleDto, req.user.id);
  }

  @Get()
  async getAllDesc(): Promise<Article[]> {
    return this.articleService.getAllDescByDate();
  }

  @Get(':post_id')
  async getOne(@Param('post_id') id: string): Promise<Article> {
    return this.articleService.getById(id);
  }
}
