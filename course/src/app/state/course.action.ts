import { Course } from "../models/course.interface";


export class AddCourse {
    static readonly type = '[Course] Add';
  
    constructor(public payload: Course, public image: File ) {
    }
  }
  
  export class GetCourses {
    static readonly type = '[Course] Get';
  }
  
  export class UpdateCourse {
    static readonly type = '[Course] Update';
  
    constructor(public payload: Course, public id: string, public image: File ) {
    }
  }
  
  export class DeleteCourse {
    static readonly type = '[Course] Delete';
  
    constructor(public id: string) {
    }
  }

  export class SetSelectedCourse {
    static readonly type = '[Course] Set';

    constructor(public payload: Course) {
    }
}