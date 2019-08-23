
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
    }

    unsubscribe(obs: Observer) {
        _.remove(this.observers, observer => observer === obs);
    }
}

/**
 * Store could be an Observable. It means that Store can
 * be an Observable of the Global Application state:
 */
class DataStore implements Observable {
    /**
     * Another advantage is that we encapsulate data in only one place.
     */
    private lessons: Lesson[] = [ ];

    /**
     * In RxJS library is best practice to keep subjects private
     * for two reasons:
     * 
     *    1. Because they have direct access to the data,
     *    2. And no one which is going to subscribe to the Observable
     *       can emit new values on behalf of the observable.
     */
    private lessonsListSubject = new SubjectImplementation();

    public subscribe(obs: Observer) {
        this.lessonsListSubject.subscribe(obs);
           
        /**
         * We send the last stored value to every external entity
         * which subscribe to the observable it means that doesn't
         * matter at which moment consumers subscribe to the observable
         * they are going to receive the last value.
         */
        obs.next(this.lessons);
    }

    public unsubscribe(obs: Observer) {
        this.lessonsListSubject.unsubscribe(obs)
    }

    public initializeLessonsList(newList: Lesson[]) {
        this.lessons = _.cloneDeep(newList);
        this.broadcast();
    }

    public addLesson(newLesson: Lesson) {
        /**
         * It is very important to clone the new arriving data in order to
         * avoid adding internal state. That means that we could have references
         * to external objects.
         */
        this.lessons.push(_.cloneDeep(newLesson));
        this.broadcast();
    }

    public deleteLesson(deleted: Lesson) {
        _.remove(this.lessons, lesson => lesson.id === deleted.id);
        this.broadcast();
    }

    public toggleLessonViewed(toggled: Lesson) {
        // let lesson = _.find(this.lessons, lesson => lesson.id === toggled.id);
        let lesson = this.lessons.find(lesson => lesson.id === toggled.id);

        if (lesson) {
            lesson.completed = !lesson.completed;
            this.broadcast();
        }
    }

    public broadcast() {
        this.lessonsListSubject.next(_.cloneDeep(this.lessons));
    }
}

export const store = new DataStore();

/**
 * Store pattern and Observable pattern
 * Summarizing:
 * 
 * 1. We avoid direct access to the data.
 *    We avoid external components could emit new versions of the data. If 
 *    a component needs the data it must subscribe to the observable and not
 *    to have direct access to the data.
 * 
 * 2. We don't care about timing it means we don't care when the data is going to 
 *    be sent components only susbcribe to the observable and they receive the last
 *    stored-value.
 * 
 * 3. Now, there is only one ower of the data in this case is the Store. Any operation
 *    on the data must be through methods exposed by the Store. When data is mutated 
 *    the Store is responsible to broadcast the changes to all the interested components.
 * 
 * NOTES:   This patterns are recommended to use when we have a very deeper component tree
 *          because passing data to components via @Input properties is not practical.
 */
