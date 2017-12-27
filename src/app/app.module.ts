import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {AuthenticatedOnlyDirective, FooterComponent, HeaderComponent, SharedModule} from './shared';
import {DashboardModule} from './dashboard';
import {HttpErrorInterceptorService} from './shared/listener';
import {LoginModule} from './login';
import {ProfileModule} from './profile';
import {UsersModule} from './users';
import {rootRouting} from './routes';
import {DutiesModule} from './duties';
import {SkillsModule} from './skills';
import {MentorsModule} from './mentors';
import {TrainingsModule} from './trainings';
import {DateTimePickerModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TasksModule} from './tasks';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        AuthenticatedOnlyDirective,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DashboardModule,
        DateTimePickerModule,
        DutiesModule,
        LoginModule,
        MentorsModule,
        ProfileModule,
        rootRouting,
        SharedModule,
        SkillsModule,
        TasksModule,
        TrainingsModule,
        TranslateModule.forRoot({
            loader: {
                deps: [HttpClient],
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory
            }
        }),
        UsersModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
