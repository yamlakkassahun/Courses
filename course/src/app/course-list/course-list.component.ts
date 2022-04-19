import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { Course } from '../models/course.interface';
import { CourseService } from '../service/course.service';
import { Select, Store } from '@ngxs/store';
import { CourseState } from '../state/course.state';
import { DeleteCourse, GetCourses, SetSelectedCourse } from '../state/course.action';
import { select } from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  @Select(CourseState.getCourseList) courses!: Observable<Course[]>;

  @Select(CourseState.areCoursesLoaded) areCoursesLoaded$: any;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.areCoursesLoaded$.pipe(
      tap((areCoursesLoaded) => {
        if (!areCoursesLoaded) {
          this.store.dispatch(new GetCourses());
        }
      })
    ).subscribe((value: any) => {
      console.log(value);
    });
  }


  deleteCourse(courseId: string) {
    this.store.dispatch(new DeleteCourse(courseId));
  }

  editCourse(course: Course) {
    this.store.dispatch(new SetSelectedCourse(course));
    this.router.navigate(['/course-add']);
  }

}
