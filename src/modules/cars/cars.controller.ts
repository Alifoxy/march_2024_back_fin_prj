import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UpdateArticleDto } from './models/dto/req/update-article.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { ArticleResDto } from './models/dto/res/article.res.dto';
import { ArticlesMapper } from './services/articles.mapper';
import { CarID } from "../../common/types/entity-ids.type";
import { ListArticleQueryDto } from './models/dto/req/list-article-query.dto';
import { ArticleListResDto } from './models/dto/res/article-list.res.dto';
import { CarListResDto } from "./models/dto/res/car-list.res.dto";
import { CarResDto } from "./models/dto/res/car-base.res.dto";
import { CarBaseReqDto } from "./models/dto/req/car-base.req.dto";
import { CarsService } from "./services/cars.service";
import { CarsMapper } from "./services/cars.mapper";


@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarBaseReqDto,
  ): Promise<CarResDto> {
    const result = await this.carService.create(userData, dto);
    return CarsMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: ListArticleQueryDto,
  ): Promise<CarListResDto> {
    const [entities, total] = await this.articleService.findAll(
      userData,
      query,
    );
    return ArticlesMapper.toResDtoList(entities, total, query);
  }

  @Get(':carId')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: CarID,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.findOne(userData, articleId);
    return ArticlesMapper.toResDto(result);
  }

  @Patch(':carId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
    @Body() dto: UpdateArticleDto,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.update(userData, articleId, dto);
    return ArticlesMapper.toResDto(result);
  }