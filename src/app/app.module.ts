import {BrowserModule} from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HeaderComponent, FooterComponent} from './shared';
import {ApiService, JwtService, AuthService} from './shared/service/';
import {LoginModule} from './login/login.module';
import {AuthenticatedOnlyDirective} from './shared/authenticated-only.directive';
import {ShowAdminDirective} from './shared/show-admin.directive';
import {ShowEmployeeDirective} from './shared/show-employee.directive';
import {ShowUnitLeaderDirective} from './shared/show-unit-leader.directive';
import {HttpErrorInterceptorService} from './shared/listener/http-error-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        AuthenticatedOnlyDirective,
        ShowAdminDirective,
        ShowEmployeeDirective,
        ShowUnitLeaderDirective
    ],
    imports: [
        LoginModule,
        BrowserModule,
        rootRouting
    ],
    providers: [
        ApiService,
        AuthService,
        JwtService,
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
