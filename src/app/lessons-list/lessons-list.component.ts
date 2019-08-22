import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { Observer, lessonsList$ } from "../event-bus-experiments/app-data";
import { Lesson } from "../shared/model/lesson";

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer, OnInit {

    lessons: Lesson[] =[];

    constructor() {
        console.log('lesson list component is registered as observer ..');
    }

    ngOnInit(){
        /**
         * One advantage is that we don't care about timing it means we don't 
         * care when the data is going to arrive we only susbcribe to the observable.
         * 
         * These component is subscribing in ngOnInit() hook method but
         * LessonsCounterComponent component is subscribing in constructor method.
         */
        lessonsList$.subscribe(this);
    }

    next(data: Lesson[]) {
        console.log('Lessons list component received data ..');
        this.lessons = data.slice(0);
    }

    toggleLessonViewed(lesson:Lesson) {
        console.log('toggling lesson ...');
        lesson.completed = !lesson.completed;
    }

    delete(deleted:Lesson) {
        _.remove(this.lessons,
            lesson => lesson.id === deleted.id )
    }



}



