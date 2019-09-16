import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "../shared/model/lesson";
import {CoursesHttpService} from "../services/courses-http.service";
import {Course} from "../shared/model/course";
import { LessonsPagerService } from 'app/services/lessons-pager.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

    @Input()
    id: number;

    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    constructor(
        private coursesService: CoursesHttpService,
        private lessonsPagerService: LessonsPagerService) {

    }

    ngOnInit() {
        this.course$ = this.coursesService.findCourseById(this.id);
        this.lessons$ = this.lessonsPagerService.lessonsPage$;

        this.lessonsPagerService.loadFirstPage(this.id);
    }

    previousLessonsPage() {
        this.lessonsPagerService.previousPage();
    }

    nextLessonsPage() {
        this.lessonsPagerService.nextPage();
    }

    ngOnDestroy() {
        console.log('destroying CourseComponent ...');
    }

}








