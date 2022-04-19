import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseRepository } from './courses.repostory';

@Module({
  imports: [TypeOrmModule.forFeature([Course]),],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository]
})
export class CourseModule {}
