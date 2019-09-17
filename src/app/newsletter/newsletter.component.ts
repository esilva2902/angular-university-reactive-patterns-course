import { NewsletterService } from './../services/newsletter.service';
import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { UserService } from 'app/services/user.service';

@Component({
    selector: 'newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * Newsletter component has OnPush Change Detection strategy and it doesn't
 * have any input properties but the component have to show the logged in user's 
 * first name.
 * 
 * CourseDetailComponent.loginAsJohn() method listener was created to simulate a 
 * login in order to demostrate that NewsletterComponent.firstName property doesn't change.
 * 
 * To display user's first name once the user has logged in, we have two options:
 * 
 * 1. We can inject an instance of ChangeDetectorRef. Once we have subscribed to 
 *    UserService.user$ observable in order to get the logged-in user's first name
 *    we have to call ChangeDetectorRef.markForCheck() method in order to Angular's Change
 *    Detection mechanism reflects the new value of NewsletterComponent.firstName property.
 * 
 * 2. The second option is making NewsletterComponent.firstName property an Observable and
 *    then consume it from the template via the async pipe operator. When we consume observables
 *    from the template, Angular verifies component's changing properties despite Change Detection Strategy.
 */

export class NewsletterComponent implements OnInit {

    firstName:string;

    constructor(
        private cdr: ChangeDetectorRef,
        private newsletterService: NewsletterService,
        private userService: UserService) {

    }

    ngOnInit() {
        this.userService.user$.subscribe(user => {
            this.firstName = user.firstName;
            this.cdr.markForCheck();
        });
    }

    subscribeToNewsletter(emailField) {
        this.newsletterService.subscribeToNewsletter(emailField.value)
          .subscribe(
              () => {
                alert('Subscription successful ...');
                emailField.value = '';
              },
              console.error
          );
    }
}
