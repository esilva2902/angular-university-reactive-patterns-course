import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../shared/model/user';
import { tap } from 'rxjs/operators';

export const UNKNOWN_USER: User = {
  firstName: 'Unknown'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject(UNKNOWN_USER);
  user$: Observable<User> = this.userSubject.asObservable();

  constructor(
    private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    let body = {
      email: username,
      password: password
    };

    return this.httpClient.post('/api/login', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap(console.log),
      tap(user => this.userSubject.next(user as User))
    ).publishLast().refCount() as Observable<User>;
  }
}
