import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {AuthService} from './shared/service/auth.service';

@Component({
    selector: 'app-aurora',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    constructor(private authService: AuthService, translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    ngOnInit(): void {
        this.authService.populate();
    }
}
