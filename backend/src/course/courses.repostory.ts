import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Course } from './entities/course.entity';

//the repository will tack the decorator entityRepository and tack entity
@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  private logger = new Logger('TasksRepository');

  async createCourse(course: Course, image: Express.Multer.File): Promise<Course> {
    //this will distract the dto to title and description
    const { name, description } = course;
    const data = this.create({
      name,
      description,
      image: image.path 
    });
    await this.save(data);
    return data;
  }
}