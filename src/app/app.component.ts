import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

import {AuthService} from './shared/service/auth.service';

@Component({
    selector: 'app-aurora',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    private translate: TranslateService;
    private titlePrefix = 'Aurora';

    constructor(private authService: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private titleService: Title,
                translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
        this.translate = translate;
    }

    ngOnInit(): void {
        this.authService.populate();
        this.processPageTitle();
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
        this.translate.get(event['title'])
            .subscribe(translatedTitle => {
                const title = this.createPageTitle(event['title'], translatedTitle);
                this.titleService.setTitle(title);
            });
    }

    private createPageTitle(titleKey: string, translatedTitle: string): string {
        return this.titlePrefix + (titleKey ? (' - ' + translatedTitle) : '');
    }
}
