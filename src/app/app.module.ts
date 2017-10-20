import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ApiService, AuthService, DutiesService, JwtService, RolesService, UsersService} from './shared/service';
import {AppComponent} from './app.component';
import {
    AuthenticatedOnlyDirective,
    HeaderComponent,
    FooterComponent,
    ShowAdminDirective,
    ShowEmployeeDirective,
    ShowUnitLeaderDirective
} from './shared';
import {DashboardModule} from './dashboard';
import {HttpErrorInterceptorService} from './shared/listener';
import {LoginModule} from './login';
import {ProfileModule} from './profile';
import {AdminModule} from './admin';
import {UnitLeaderModule} from './unit-leader';
import {SharedModule} from './shared/shared.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/error/404',
        pathMatch: 'full'
    }
], {useHash: true});

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
        AdminModule,
        BrowserModule,
        DashboardModule,
        LoginModule,
        ProfileModule,
        rootRouting,
        SharedModule,
        TranslateModule.forRoot({
            loader: {
                deps: [HttpClient],
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory
            }
        }),
        UnitLeaderModule
    ],
    providers: [
        ApiService,
        AuthService,
        DutiesService,
        JwtService,
        RolesService,
        UsersService,
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
