import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppComponent} from './app.component';
import {AuthenticatedOnlyDirective, HeaderComponent, SharedModule} from './msh';
import {DashboardModule} from './mda';
import {HttpErrorInterceptorService} from './msh/listener';
import {LoginModule} from './mlo';
import {UsersModule} from './mus';
import {rootRouting} from './routes';
import {SkillsModule} from './msk';
import {MentorsModule} from './mme';
import {TrainingsModule} from './mtr';
import {DateTimePickerModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TasksModule} from './mta';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AuthenticatedOnlyDirective,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DashboardModule,
        DateTimePickerModule,
        LoginModule,
        MentorsModule,
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
