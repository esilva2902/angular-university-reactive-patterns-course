
import * as _ from 'lodash';
import { Lesson } from 'app/shared/model/lesson';

export interface Observer {
    next(data:any);
}

export interface Observable {
    subscribe(obs:Observer);
    unsubscribe(obs:Observer);
}

/**
 * A Subject has the ability to be an Observer and an Observable as well.
 * 
 * A subject is considered an Event Bus because we have only one
 * place where event emissions occur.
 */
interface Subject extends Observer, Observable {
    
}

class SubjectImplementation implements Subject {
    private observers: Observer[] = [ ];

    next(data: any) {
        this.observers.forEach(observer => observer.next(data));
    }    
    
    subscribe(obs: Observer) {
        this.observers.push(obs);

        /**
         * We send the last stored value to every external entity
         * which subscribe to the observable it means that doesn't
         * matter at which moment consumers subscribe to the observable
         * they are going to receive the last value.
         */
        obs.next(lessons);
    }
    unsubscribe(obs: Observer) {
        _.remove(this.observers, observer => observer === obs);
    }
}

/**
 * In RxJS library is best practice to keep subjects private
 * for two reasons:
 * 
 *    1. Because they have direct access to the data,
 *    2. And no one which is going to subscribe to the Observable
 *       can emit new values on behalf of the observable.
 */
const lessonsListSubject = new SubjectImplementation();

export let lessonsList$: Observable = {
    subscribe(obs) {
        lessonsListSubject.subscribe(obs);
    },

    unsubscribe: obs => lessonsListSubject.unsubscribe(obs)
};

/**
 * Another advantage is that we encapsulate data in only one place.
 */
let lessons: Lesson[] = [ ];

export function initializeLessonsList(newList: Lesson[]) {
    lessons = _.cloneDeep(newList);
    lessonsListSubject.next(lessons);
}

