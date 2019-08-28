import { Component, OnInit } from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import {store} from "../event-bus-experiments/app-data";

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements OnInit {

    lessonsCounter = 0;

    ngOnInit() {
        console.log('LessonsCounterComponent is registered as observer ..');
        store.lessonsList$.subscribe(data => this.lessonsCounter = data.length);

    }
}
