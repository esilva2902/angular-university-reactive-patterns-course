import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { Observer, store } from "../event-bus-experiments/app-data";
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
        store.subscribe(this);
    }

    next(data: Lesson[]) {
        console.log('Lessons list component received data ..');
        this.lessons = data;
    }

    toggleLessonViewed(lesson:Lesson) {
        console.log('toggling lesson ...');
        store.toggleLessonViewed(lesson);
    }

    delete(deleted:Lesson) {
        store.deleteLesson(deleted);
    }



}



