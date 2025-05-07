import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IdParamDTO } from 'src/OthersDtos/id-param.dto';
import { ImageUploadPipe } from './pipes/image-upload/image-upload.pipe';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('File Upload')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard) // Header de autorizacion
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data') // para que sagger me permite subir archivos
  @ApiBody({description: 'Subir una imagen de un producto', schema: {type: 'object', properties: { file: { type: 'string', format: 'binary'},},}})
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param() param: IdParamDTO,
    @UploadedFile(new ImageUploadPipe()) file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadFile(file, param.id);
  }
}
