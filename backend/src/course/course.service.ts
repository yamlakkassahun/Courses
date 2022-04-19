import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) { }

  async create(course: Course, image?: Express.Multer.File): Promise<Course> {
    const newCourse = new Course();
    newCourse.name = course.name;
    newCourse.image = image.filename;
    newCourse.description = course.description;
    await this.courseRepository.save(newCourse);
    return newCourse;
  }

  async update(id: string, course: Course, image?: Express.Multer.File): Promise<Course> {
    const { name, description } = course;
    if (image !== undefined) {
      const oldCourse = await this.findOne(id);
      oldCourse.name = name;
      oldCourse.image = image.filename;
      oldCourse.description = description;
      await this.courseRepository.save(oldCourse);
      return oldCourse;
    }
    const oldCourse = await this.findOne(id);
    oldCourse.name = name;
    oldCourse.description = description;
    await this.courseRepository.save(oldCourse);
    return oldCourse;
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({});
  }

  async findOne(id: string): Promise<Course> {
    return this.courseRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
