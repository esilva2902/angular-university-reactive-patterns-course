import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../shared/model/user';
import { tap } from 'rxjs/operators';

export const UNKNOWN_USER: User = {
  firstName: 'Unknown'
};

/**
 * The main purpose of this kind of services is cache the data in memory.
 * 
 * They are highly independent of all application components 
 * because they only retrieve the data, store it and let 
 * consumers, via subscriptions, getting the data.
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * A Behaviour Subject is usually used to emit new values of data and store the last value. 
   * Behaviour subject must be private.
   */
  private userSubject: BehaviorSubject<User> = new BehaviorSubject(UNKNOWN_USER);

  /**
   * Expose an Observable in order to publish changes in data they hold.
   */
  user$: Observable<User> = this.userSubject.asObservable();

  /**
   * They could have injectable instances of Stateless services.
   */
  constructor(
    private httpClient: HttpClient) { }

  /**
   * Have a public API allowing to modify the data they are keeping.
   */
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
