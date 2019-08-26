import { Subject, Observable, Observer, BehaviorSubject } from 'rxjs'; 

import * as _ from 'lodash';
import {Lesson} from "../shared/model/lesson";



class DataStore {
    private lessonsListSubject: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);

    public lessonsList$: Observable<Lesson[]> = this.lessonsListSubject.asObservable();

    initializeLessonsList(newList: Lesson[]) {
        this.lessonsListSubject.next(_.cloneDeep(newList));
    }

    addLesson(newLesson: Lesson) {
        let lessons = this.cloneLessons();
        lessons.push(_.cloneDeep(newLesson));

        this.lessonsListSubject.next(lessons);
    }

    deleteLesson(deleted:Lesson) {
        let lessons = this.cloneLessons();
        _.remove(lessons, lesson => lesson.id === deleted.id );
        
        this.lessonsListSubject.next(lessons);
    }

    toggleLessonViewed(toggled:Lesson) {
        let lessons = this.cloneLessons();
        let lesson = _.find(lessons, lesson => lesson.id === toggled.id);
        lesson.completed = ! lesson.completed;

        this.lessonsListSubject.next(lessons);
    }

    private cloneLessons(): Lesson[] {
        return _.cloneDeep(this.lessonsListSubject.getValue());
    }
}

export const store = new DataStore();







