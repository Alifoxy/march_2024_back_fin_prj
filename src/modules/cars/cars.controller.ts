import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query, UploadedFile, UseInterceptors
} from "@nestjs/common";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CarID } from '../../common/types/entity-ids.type';
import { CarListResDto } from './models/dto/res/car-list.res.dto';
import { CarResDto } from './models/dto/res/car-base.res.dto';
import { CarBaseReqDto } from './models/dto/req/car-base.req.dto';
import { CarsService } from './services/cars.service';
import { CarsMapper } from './services/cars.mapper';
import { UpdateCarDto } from './models/dto/req/update-car.dto';
import { ListCarQueryDto } from './models/dto/req/car-list-query.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiFile } from "../../common/decorators/api-file.decorator";

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('cars')
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
    @Query() query: ListCarQueryDto,
  ): Promise<CarListResDto> {
    const [entities, total] = await this.carService.findAll(userData, query);
    return CarsMapper.toResDtoList(entities, total, query);
  }

  @Get(':carId')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: CarID,
  ): Promise<CarResDto> {
    const result = await this.carService.findOne(userData, carId);
    return CarsMapper.toResDto(result);
  }

  @Patch(':carId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) carId: CarID,
    @Body() dto: UpdateCarDto,
  ): Promise<CarResDto> {
    const result = await this.carService.update(userData, carId, dto);
    return CarsMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.carService.uploadPhoto(userData, file);
  }

  @ApiBearerAuth()
  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.carService.deletePhoto(userData);
  }
}
