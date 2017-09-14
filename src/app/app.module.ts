import {BrowserModule} from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HeaderComponent, FooterComponent} from './shared';
import {ApiService, JwtService, AuthService} from './shared/service/';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        rootRouting
    ],
    providers: [
        ApiService,
        AuthService,
        JwtService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
