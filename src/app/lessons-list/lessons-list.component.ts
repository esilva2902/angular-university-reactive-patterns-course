import {Component, OnInit} from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import * as _ from 'lodash';
import {store} from "../event-bus-experiments/app-data";

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {
        
    lessons: Lesson[] = [];

    ngOnInit() {
        console.log('LessonsListComponent is registered as observer ..');
        store.lessonsList$.subscribe(data => this.lessons = data);
    }

    toggleLessonViewed(lesson:Lesson) {
        console.log('toggling lesson ...');
        store.toggleLessonViewed(lesson);
    }

    delete(deleted:Lesson) {
        store.deleteLesson(deleted);
    }



}



