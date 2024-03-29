import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  forwardRef,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('uploads')
export class UploadsController {
  @Inject(forwardRef(() => UploadsService))
  public uploadsService: UploadsService;

  @Post(':albumID/image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('albumID', ParseUUIDPipe) albumId: string,
  ) {
    if (!file) throw new BadRequestException('File is required');

    return await this.uploadsService.addFileToAlbum(file, albumId);
  }
}
