import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetCourses } from './state/course.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'course';
}
