import {Component, OnInit} from '@angular/core';
import {testLessons} from "../shared/model/test-lessons";
import {Lesson} from "../shared/model/lesson";
import {store} from "./app-data";

@Component({
    selector: 'event-bus-experiments',
    templateUrl: './event-bus-experiments.component.html',
    styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

    ngOnInit() {

        console.log('Top level component broadcasted all lessons ...');

        store.initializeLessonsList(testLessons.slice(0));

        setTimeout(() => {

            const newLesson = {
                id: Math.random(),
                description: 'New lesson arriving from the backend'
            };

            console.log(`After 10 seconds we add a new Lesson...`);
            store.addLesson(newLesson);

        }, 5000);

    }

    addLesson(lessonText: string) {
        const newLesson = {
            id: Math.random(),
            description: lessonText
        };

        store.addLesson(newLesson);
    }

}












