import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseEnumPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleType } from '../types/enums/article.enum';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Serialize } from '../interceptors/serialization.interceptor';
import { ArticleDto } from './dto/article.dto';
import { Day } from '../types/enums/day.enum';

@Serialize(ArticleDto)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAllByType(
    @Query('type') type: ArticleType,
    @Query('headers') headers: true,
  ) {
    if (type || headers) {
      return this.articlesService.findAllByQuery(type, headers);
    }
    return this.articlesService.findAll();
  }

  @Get('/types')
  getArticlesTypes() {
    const types = Object.entries(ArticleType);

    return types;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.articlesService.remove(id);
  }
}