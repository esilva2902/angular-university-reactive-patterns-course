import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessagesService } from './../services/messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  errors$: Observable<string []>;

  constructor(
    private messagesService: MessagesService) { }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$;
  }

  close() {
    /**
     * Closing the error message in a reactive style:
     * 
     * Since MessagesComponent is displayed based on errors$ observable
     * we simply put errors$ variable as undefined via MessageService.error() api.
     */
    this.messagesService.error();
  }
}
