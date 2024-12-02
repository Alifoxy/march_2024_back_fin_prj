import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { CarID } from '../../../common/types/entity-ids.type';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CarEntity } from '../../../database/entities/car.entity';
import { CarRepository } from '../../repository/services/car.repository';
import { StatisticRepository } from '../../repository/services/statistic.repository';
import { ListCarQueryDto } from '../models/dto/req/car-list-query.dto';
import { UpdateCarDto } from '../models/dto/req/update-car.dto';
import { CarBaseReqDto } from '../models/dto/req/car-base.req.dto';
import { ContentType } from '../../file-storage/enums/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';

@Injectable()
export class CarsService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly carRepository: CarRepository,
    private readonly statisticRepository: StatisticRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CarBaseReqDto,
  ): Promise<CarEntity> {
    const statistic = await this.createStatistic(dto.statistic);

    return await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        statistic,
        user_id: userData.userId,
      }),
    );
  }

  public async findAll(
    userData: IUserData,
    query: ListCarQueryDto,
  ): Promise<[CarEntity[], number]> {
    return await this.carRepository.findAll(userData, query);
  }

  public async findOne(userData: IUserData, carId: CarID): Promise<CarEntity> {
    return await this.carRepository.getById(userData, carId);
  }

  public async update(
    userData: IUserData,
    carId: CarID,
    updateUserDto: UpdateCarDto,
  ): Promise<CarEntity> {
    return {} as any;
  }

  public async uploadPhoto(
    carData: CarBaseReqDto,
    file: Express.Multer.File,
  ): Promise<void> {
    const car = await this.carRepository.findOneBy({ id: carData.carId });
    const pathToFile = await this.fileStorageService.uploadFile(
      file,
      ContentType.IMAGE,
      carData.carId,
    );
    if (car.image) {
      await this.fileStorageService.deleteFile(car.image);
    }
    await this.carRepository.save({ ...car, image: pathToFile });
  }

  public async deletePhoto(carData: ICarData): Promise<void> {
    const car = await this.carRepository.findOneBy({ id: carData.carId });
    if (car.image) {
      await this.fileStorageService.deleteFile(car.image);
      await this.carRepository.save({ ...car, image: null });
    }
  }
}

// public async like(userData: IUserData, articleId: ArticleID): Promise<void> {
//   const article = await this.articleRepository.findOneBy({ id: articleId });
//   if (!article) {
//     throw new NotFoundException('Article not found');
//   }
//   const like = await this.likeRepository.findOneBy({
//     user_id: userData.userId,
//     article_id: articleId,
//   });
//   if (like) {
//     throw new ConflictException('You already liked this article');
//   }
//   await this.likeRepository.save(
//     this.likeRepository.create({
//       user_id: userData.userId,
//       article_id: articleId,
//     }),
//   );
// }

// public async unlike(
//   userData: IUserData,
//   articleId: ArticleID,
// ): Promise<void> {
//   const article = await this.articleRepository.findOneBy({ id: articleId });
//   if (!article) {
//     throw new NotFoundException('Article not found');
//   }
//   const like = await this.likeRepository.findOneBy({
//     user_id: userData.userId,
//     article_id: articleId,
//   });
//   if (!like) {
//     throw new ConflictException('You have not liked this article yet');
//   }
//   await this.likeRepository.remove(like);
// }
//
// private async createTags(tags: string[]): Promise<TagEntity[]> {
//   if (!tags || !tags.length) return [];
//
//   const entities = await this.tagRepository.findBy({ name: In(tags) });
//   const existingTags = entities.map((tag) => tag.name);
//   const newTags = tags.filter((tag) => !existingTags.includes(tag));
//   const newEntities = await this.tagRepository.save(
//     newTags.map((tag) => this.tagRepository.create({ name: tag })),
//   );
//   return [...entities, ...newEntities];
// }
// public async uploadPhoto(
//   carData: ICarData,
//   file: Express.Multer.File,
// ): Promise<void> {
//   const car = await this.carsRepository.findOneBy({ id: carData.carId });
//   const pathToFile = await this.fileStorageService.uploadFile(
//     file,
//     ContentType.IMAGE,
//     carData.carId,
//   );
//   if (car.image) {
//   await this.fileStorageService.deleteFile(car.image);
// }
// await this.carRepository.save({ ...car, image: pathToFile });
// }

// public async deletePhoto(carData: ICarData): Promise<void> {
//   const car = await this.carsRepository.findOneBy({ id: carData.carId });
//   if (car.image) {
//   await this.fileStorageService.deleteFile(car.image);
//   await this.carsRepository.save({ ...car, image: null });
// }
// }
