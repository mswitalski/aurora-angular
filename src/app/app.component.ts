import {Component, OnInit} from '@angular/core';

import {AuthService} from './shared/service/auth.service';

@Component({
    selector: 'app-aurora',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.populate();
    }
}
