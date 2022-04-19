import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './client/images',
        filename: (req, file, cd) => {
          cd(
            null,
            new Date().toISOString().replace(/:/g, '-') +
              '_' +
              file.originalname,
          );
        },
      }),
    }),
  )
  create(@Body() course: Course, @UploadedFile() image?: Express.Multer.File) {
    return this.courseService.create(course, image);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './client/images',
        filename: (req, file, cd) => {
          cd(
            null,
            new Date().toISOString().replace(/:/g, '-') +
              '_' +
              file.originalname,
          );
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() course: Course,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.courseService.update(id, course, image);
  }

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './client/images',
        filename: (req, file, cd) => {
          cd(
            null,
            new Date().toISOString().replace(/:/g, '-') +
              '_' +
              file.originalname,
          );
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() image?: Express.Multer.File) {
    console.log(image);
  }
}
