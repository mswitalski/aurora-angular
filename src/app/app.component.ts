import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './msh/service';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-aurora',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})

export class AppComponent {

    private titlePrefix = 'Aurora';

    constructor(private authService: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private titleService: Title,
                private translate: TranslateService) {
        this.translate.setDefaultLang(environment.defaultLanguage);
        this.translate.use(this.detectSupportedLanguage());
        this.authService.populate();
        this.processPageTitle();
    }

    private detectSupportedLanguage(): string {
        if (environment.supportedLanguages.indexOf(navigator.language) !== -1) {
            return navigator.language;

        } else {
            const supported = navigator.languages.filter(l => environment.supportedLanguages.indexOf(l) !== -1);

            return supported.length !== 0 ? supported[0] : environment.defaultLanguage;
        }
    }

    private processPageTitle() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                }

                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe(event => this.subscribeForTranslation(event));
    }

    private subscribeForTranslation(event: any) {
        if (event['title']) {
            this.translate.get(event['title'])
                .subscribe(translatedTitle => {
                    const title = this.createPageTitle(event['title'], translatedTitle);
                    this.titleService.setTitle(title);
                });

        } else {
            const title = this.createPageTitle(event['title'], null);
            this.titleService.setTitle(title);
        }
    }

    private createPageTitle(titleKey: string, translatedTitle: string): string {
        return this.titlePrefix + (titleKey ? (' - ' + translatedTitle) : '');
    }
}
