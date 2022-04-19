import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from "rxjs/operators";
import { Course } from "../models/course.interface";
import { CourseService } from "../service/course.service";
import { AddCourse, DeleteCourse, GetCourses, SetSelectedCourse, UpdateCourse } from "./course.action";

export class CourseStateModel {
  courses!: Course[];
  selectedCourse!: Course | null;
  areCoursesLoaded!: boolean;
}

@State<CourseStateModel>({
  name: 'courses',
  defaults: {
    courses: [],
    selectedCourse: null,
    areCoursesLoaded: false
  }
})


@Injectable()
export class CourseState {

  constructor(private courseService: CourseService, private router: Router) {
  }

  @Selector()
  static getCourseList(state: CourseStateModel) {
    return state.courses;
  }

  @Selector()
  static areCoursesLoaded(state: CourseStateModel) {
    return state.areCoursesLoaded;
  }

  @Selector()
  static getSelectedCourse(state: CourseStateModel) {
    return state.selectedCourse;
  }

  @Action(GetCourses)
  getCourses({ getState, setState }: StateContext<CourseStateModel>) {
    return this.courseService.getAllCourses().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          courses: result,
          areCoursesLoaded: true
        });
      })
    );
  }

  @Action(AddCourse)
  addCourse({ getState, patchState }: StateContext<CourseStateModel>, { payload, image }: AddCourse) {
    return this.courseService.createCourse(payload, image).pipe(tap((result) => {
      const state = getState();
      patchState({
        courses: [...state.courses, result]
      });
    }));
  }

  @Action(DeleteCourse)
  deleteCourse({ getState, setState }: StateContext<CourseStateModel>, { id }: DeleteCourse) {
    return this.courseService.deleteCourse(id).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.courses.filter(item => item.id !== id);
        setState({
          ...state,
          courses: filteredArray,
        });
      })
    );
  }

  @Action(UpdateCourse)
  updateCourse({ getState, setState }: StateContext<CourseStateModel>, { payload, id, image }: UpdateCourse) {
    return this.courseService.updateCourse(id, payload, image).pipe(
      tap(result => {
        const state = getState();
        const coursesList = [...state.courses];
        const courseIndex = coursesList.findIndex(item => item.id === id);
        coursesList[courseIndex] = result;
        setState({
          ...state,
          courses: coursesList,
        });
      })
    );
  }

  @Action(SetSelectedCourse)
  setSelectedCourseId({ getState, setState }: StateContext<CourseStateModel>, { payload }: SetSelectedCourse) {
    const state = getState();
    setState({
      ...state,
      selectedCourse: payload
    });
    return;
  }

}

