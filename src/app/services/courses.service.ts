import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';

import { Course } from 'app/shared/model/course';
import { Lesson } from 'app/shared/model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  /**
   * The CourseService class is an Stateless service:
   * 
   * 1. Now, CoursesService is the only place where we have access to
   *    the Data layer. We decoupled data-access from the View layer.
   *    Since we are going to deliver the data as streams, the View layer 
   *    is not aware when the data is arriving.
   * 
   * 2. In a Stateless service we mustn't have a reference to the retrieved data.
   * 
   * 3. Since this type of services should retrieve data from backends they
   *    deliver the data to consumer asynchronously.
   * 
   */
  constructor(private db: AngularFireDatabase) { }

  /**
   * By default Angular Firebase dispatch long-lived observables it
   * means that once subscribing to them a permanent connection is created.
   * 
   * In order to avoid long-lived observables we can take only the first 
   * emitted value and disconnect from the source Observable. We can use first or 
   * take(1) operators:
   */
  findAllCourses(): Observable<Course []> {
    return this.db.list('courses')
      .valueChanges()
      .pipe(
        first(),
        map(values => {
          console.log(`findAllCourses(): `, values);
          return values as unknown[] as Course [];
        })
      );
  }

  findLatestLessons(): Observable<Lesson []> {
    return this.db.list('lessons', ref => ref.orderByKey().limitToLast(10))
      .valueChanges()
      .pipe(
        first(),
        map(values => {
          console.log(`findLatestLessons(): `, values);
          return values as unknown[] as Lesson [];
        })
      );
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list('courses', ref => ref.orderByChild('url').equalTo(courseUrl))
      .snapshotChanges()
      .pipe(
        first(),
        map(data => {
          // console.log(`findCourseByUrl(courseUrl: string): `, data);
          // console.log(`data[0].payload.val(): `, data[0].payload.val());

          return {
            id: data[0].payload.key,
            ...data[0].payload.val()
          } as Course;
        })
      );
  }

  findLessonsByCourse(courseId: string): Observable<Lesson []> {
    return this.db.list('lessons', ref => ref.orderByChild('courseId').equalTo(courseId))
      .snapshotChanges()
      .pipe(
        first(),
        map(data => {
          // console.log(`findLessonsByCourse(courseId: string): `, data);
          // console.log(`data[0].payload.val(): `, data[0].payload.val());

          return data.map(value => {
            return {
              id: value.key,
              ...value.payload.val()
            } as Lesson;
          });
        })
      );
  }
}
