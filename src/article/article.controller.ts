import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { ArticleInterface } from './interface/article.interface';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @UseGuards(JwtGuard)
  async add(@Body() articleDto: ArticleDto, @Request() req): Promise<any> {
    return this.articleService.create(articleDto, req.user.id);
  }
}
