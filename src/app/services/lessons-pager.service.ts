import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Lesson } from 'app/shared/model/lesson';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LessonsPagerService {

  private static readonly PAGE_SIZE = 2;
  private lessonsSubject: BehaviorSubject<Lesson []> = new BehaviorSubject<Lesson []>([ ]);
  private courseId: number;

  lessonsPage$: Observable<Lesson []> = this.lessonsSubject.asObservable();
  currentPageNumber = 1;

  constructor(private http: Http) { }

  loadFirstPage(courseId: number) {
    this.courseId = courseId;
    this.currentPageNumber = 1;
    this.loadPage(this.currentPageNumber);
  }

  previousPage() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber -= 1;
      this.loadPage(this.currentPageNumber);
    }
  }

  nextPage() {
    this.currentPageNumber += 1;
    this.loadPage(this.currentPageNumber);
  }

  loadPage(pageNumber: number) {
    this.http.get('/api/lessons', {
      params: {
        courseId: this.courseId,
        pageNumber,
        pageSize: LessonsPagerService.PAGE_SIZE
      }
    })
      .map(res => res.json().payload)
      .subscribe(lessons => this.lessonsSubject.next(lessons));
  }
}
