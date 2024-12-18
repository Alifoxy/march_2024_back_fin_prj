import { ConflictException, Injectable } from '@nestjs/common';

import { UserRepository } from '../../repository/services/user.repository';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { UserID } from '../../../common/types/entity-ids.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  public async removeMe(userData: IUserData): Promise<void> {
    await this.userRepository.update(
      { id: userData.userId },
      { deleted: new Date() },
    );
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  private async isUserExistOrThrow(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
  }

  // public async follow(userData: IUserData, userId: UserID): Promise<void> {
  //   if (userData.userId === userId) {
  //     throw new ConflictException('You cannot follow yourself');
  //   }
  //   await this.isUserExistOrThrow(userId);
  //
  //   const follow = await this.followRepository.findOneBy({
  //     follower_id: userData.userId,
  //     following_id: userId,
  //   });
  //   if (follow) {
  //     throw new ConflictException('You already follow this user');
  //   }
  //   await this.followRepository.save(
  //     this.followRepository.create({
  //       follower_id: userData.userId,
  //       following_id: userId,
  //     }),
  //   );
  // }
  //
  // public async unfollow(userData: IUserData, userId: UserID): Promise<void> {
  //   if (userData.userId === userId) {
  //     throw new ConflictException('You cannot unfollow yourself');
  //   }
  //   await this.isUserExistOrThrow(userId);
  //   const follow = await this.followRepository.findOneBy({
  //     follower_id: userData.userId,
  //     following_id: userId,
  //   });
  //   if (!follow) {
  //     throw new ConflictException('You do not follow this user');
  //   }
  //   await this.followRepository.delete({
  //     follower_id: userData.userId,
  //     following_id: userId,
  //   });
  // }
  // public async checkAbilityToEditArticle(userId: string, articleId: string) {
  //   // Check if the user has permission to edit the article
  // }
}
