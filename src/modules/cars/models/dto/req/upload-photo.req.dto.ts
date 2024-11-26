import { ApiProperty } from '@nestjs/swagger';

export class UploadPhotoReqDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  photo: any;
}
