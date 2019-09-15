import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class NewsletterService {


  constructor(private httpClient: HttpClient) { }

    subscribeToNewsletter(email: string): Observable<any> {
      return this.httpClient.post('/api/newsletter', { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

}
