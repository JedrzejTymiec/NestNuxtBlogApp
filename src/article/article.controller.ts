import {
  Get,
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Article } from './article.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async add(
    @Body() articleDto: ArticleDto,
    @Request() req,
    @UploadedFile() pic?: Express.Multer.File,
  ): Promise<any> {
    return this.articleService.create(req.user.id, articleDto, pic.path);
  }

  @Get()
  async getAllDesc(): Promise<Article[]> {
    return this.articleService.getAllDescByDate();
  }

  @Get(':article_id')
  async getOne(@Param('article_id') id: string): Promise<Article> {
    return this.articleService.getById(id);
  }

  @Put(':article_id')
  @UseGuards(JwtGuard)
  async edit(
    @Param('article_id') id: string,
    @Body() articleDto: ArticleDto,
    @Request() req,
  ): Promise<any> {
    return this.articleService.update(id, articleDto, req.user.id);
  }

  @Delete(':article_id')
  @UseGuards(JwtGuard)
  async delete(@Param('article_id') id: string, @Request() req): Promise<void> {
    return this.articleService.deleteById(id, req.user.id);
  }
}
