import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {BrowserEventExperimentsComponent} from './browser-event-experiments/browser-event-experiments.component';
import {EventBusExperimentsComponent} from './event-bus-experiments/event-bus-experiments.component';
import {LessonsListComponent} from './lessons-list/lessons-list.component';
import {LessonsCounterComponent} from './lessons-counter/lessons-counter.component';
import {HomeComponent} from './home/home.component';
import {firebaseConfig} from "../environments/firebase.config";
import {AngularFireModule} from '@angular/fire';
import {RouterModule} from '@angular/router';
import {routerConfig} from "./router.config";
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {CoursesService} from "./services/courses.service";
import {CoursesListComponent} from './courses-list/courses-list.component';
import {CourseDetailHeaderComponent} from './course-detail-header/course-detail-header.component';
import {NewsletterComponent} from './newsletter/newsletter.component';
import {NewsletterService} from "./services/newsletter.service";
import {TopMenuComponent} from './top-menu/top-menu.component';
import {LoginComponent} from './login/login.component';
import {UserService} from "./services/user.service";
import {AllLessonsComponent} from './all-lessons/all-lessons.component';
import {CourseComponent} from './course/course.component';
import {LessonDetailComponent} from './lesson-detail/lesson-detail.component';
import {CoursesHttpService} from "./services/courses-http.service";
import {SafeUrlPipe} from "./shared/pipes/safe-url.pipe";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireDatabaseModule} from "@angular/fire/database";

import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './services/messages.service';


@NgModule({
    declarations: [
        AppComponent,
        BrowserEventExperimentsComponent,
        EventBusExperimentsComponent,
        LessonsListComponent,
        LessonsCounterComponent,
        HomeComponent,
        CourseDetailComponent,
        CoursesListComponent,
        CourseDetailHeaderComponent,
        NewsletterComponent,
        TopMenuComponent,
        LoginComponent,
        AllLessonsComponent,
        CourseComponent,
        LessonDetailComponent,
        SafeUrlPipe,
        MessagesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterModule.forRoot(routerConfig),
    ],
    providers: [
        CoursesService,
        NewsletterService,
        UserService,
        CoursesHttpService,
        MessagesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}






