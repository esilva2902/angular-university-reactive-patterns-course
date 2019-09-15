import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from "../shared/model/course";
import { Lesson } from "../shared/model/lesson";
import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { CoursesService } from "../services/courses.service";
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private coursesService: CoursesService) {

  }

  ngOnInit() {

    /**
     * We have added first() operator in order to wait for completion of the observable. Then added
     * publishLast() operator in order to prevent calling the observable more than one time (if it is 
     * consumed in more than one place).
     */

    this.course$ = this.route.params
        .switchMap(params => this.coursesService.findCourseByUrl(params['id']))
        .first()
        .publishLast().refCount();

    this.lessons$ = this.course$
        .switchMap(course => this.coursesService.findLessonsForCourse(course.id))
        .first()
        .publishLast().refCount();
  }

  loginAsJohn() {
    this.userService.login('john@gmail.com', 'test123').subscribe();
  }
}
