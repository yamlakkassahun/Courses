import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../models/course.interface';
import { AddCourse, GetCourses, UpdateCourse } from '../state/course.action';
import { CourseState } from '../state/course.state';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  @Select(CourseState.getCourseList) courses!: Observable<Course[]>;

  @Select(CourseState.getSelectedCourse) selectedCourse!: Observable<Course>;

  addCourseForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required])
  });

  imageData!: string;
  private formSubscription: Subscription = new Subscription();

  constructor(private router: Router, private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  get name(): FormControl {
    return this.addCourseForm.get('name') as FormControl;
  }

  get image(): FormControl {
    return this.addCourseForm.get('image') as FormControl;
  }

  get description(): FormControl {
    return this.addCourseForm.get('description') as FormControl;
  }

  editCourse = false;

  ngOnInit(): void {
    this.formSubscription.add(
      this.selectedCourse.subscribe(course => {
        if (course) {
          this.addCourseForm.patchValue({
            id: course.id,
            image: course.image,
            name: course.name,
            description: course.description
          });
          this.editCourse = true;
        } else {
          this.editCourse = false;
        }
      })
    );
  }

  onFileSelect(event: Event) {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.addCourseForm.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.editCourse) {
      this.store.dispatch(new UpdateCourse(this.addCourseForm.value, this.addCourseForm.value.id, this.addCourseForm.value.image));
      this.clearForm();
      this.router.navigate(['/courses-list']);
    } else {
      console.log(this.addCourseForm.value);
      this.store.dispatch(new AddCourse(this.addCourseForm.value, this.addCourseForm.value.image));
      this.clearForm();
      this.router.navigate(['/courses-list']);
    }
  }

  clearForm() {
    this.addCourseForm.reset();
  }

  createForm() {
    this.addCourseForm = this.fb.group({
        id: uuid(),
        image: [''],
        name: [''],
        description: ['']
    });
  }
}
