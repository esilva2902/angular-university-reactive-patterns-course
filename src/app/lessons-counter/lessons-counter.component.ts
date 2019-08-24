import { Component, OnInit } from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import {store} from "../event-bus-experiments/app-data";

import { Observer } from 'rxjs';

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer<Lesson[]>, OnInit {

    lessonsCounter = 0;

    ngOnInit() {

        console.log('LessonsCounterComponent is registered as observer ..');
        store.lessonsList$.subscribe(this);

    }

    next(data: Lesson[]) {
        console.log('counter component received data ..', data);
        this.lessonsCounter = data.length;
    }

    error(err: any) {
        console.log(err);
    }

    complete() {
        console.log(`Completed`);
    }

}
