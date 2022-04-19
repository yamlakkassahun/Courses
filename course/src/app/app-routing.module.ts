import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  {
    path: 'courses-list',
    component: CourseListComponent,
  },
  {
    path: 'course-add',
    component: CourseAddComponent,
  },
  {
    path: '**',
    component: CourseListComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
