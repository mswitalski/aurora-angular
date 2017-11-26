import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {
    AuthenticatedOnlyDirective,
    HeaderComponent,
    FooterComponent
} from './shared';
import {DashboardModule} from './dashboard';
import {HttpErrorInterceptorService} from './shared/listener';
import {LoginModule} from './login';
import {ProfileModule} from './profile';
import {SharedModule} from './shared/shared.module';
import {UsersModule} from './users';
import {rootRouting} from './routes';
import {DutiesModule} from './duties';
import {SkillsModule} from './skills';

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
        DashboardModule,
        DutiesModule,
        LoginModule,
        ProfileModule,
        rootRouting,
        SharedModule,
        SkillsModule,
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
