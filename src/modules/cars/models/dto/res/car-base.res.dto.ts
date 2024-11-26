import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../../users/models/dto/res/user.res.dto';
import { ModelEnum } from '../../enums/model.enum';
import { BrandEnum } from '../../enums/brand.enum';

export class ArticleResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Article ID',
  })
  id: string;

  @ApiProperty({
    example: 'Article Title',
    description: 'Article Title',
  })
  producer: string;

  @ApiProperty({
    example: 'Car Model',
    description: 'Car Model',
  })
  model: ModelEnum;

  @ApiProperty({
    example: 'Car Brand',
    description: 'Car Brand',
  })
  brand: BrandEnum;

  @ApiProperty({
    example: 'Car Description',
    description: 'Car Description',
  })
  description: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Car Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Car Updated Date',
  })
  updated: Date;

  user?: UserResDto;

  // isLiked: boolean;
  //
  // @ApiProperty({
  //   example: ['tag1', 'tag2'],
  //   description: 'Article Tags',
  // })
  // tags: string[];
}