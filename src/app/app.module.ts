import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ApiService, AuthService, JwtService} from './shared/service';
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
import {UsersService} from './shared/service';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
], {useHash: true});

@NgModule({
    declarations: [
        AppComponent,
        AuthenticatedOnlyDirective,
        FooterComponent,
        HeaderComponent,
        ShowAdminDirective,
        ShowEmployeeDirective,
        ShowUnitLeaderDirective
    ],
    imports: [
        BrowserModule,
        DashboardModule,
        LoginModule,
        ProfileModule,
        rootRouting
    ],
    providers: [
        ApiService,
        AuthService,
        JwtService,
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
