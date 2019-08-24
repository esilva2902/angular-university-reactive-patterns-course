import {Component, OnInit} from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';
import {store} from "../event-bus-experiments/app-data";
import { Observer } from 'rxjs'; 

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {
        
    lessons: Lesson[] = [];

    ngOnInit() {
        console.log('LessonsListComponent is registered as observer ..');
        store.lessonsList$.subscribe(this);
    }

    next(data: Lesson[]) {
        console.log('Lessons list component received data ..', data);
        this.lessons = data;

        this.lessons.push({
            id: 99,
            description: 'Example'
        });
    }

    error(err: any) {
        console.log(err);
    }

    complete() {
        console.log(`Completed`);
    }

    toggleLessonViewed(lesson:Lesson) {
        console.log('toggling lesson ...');
        store.toggleLessonViewed(lesson);
    }

    delete(deleted:Lesson) {
        store.deleteLesson(deleted);
    }



}



