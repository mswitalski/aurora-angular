import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/service/auth.service';

@Component({
    selector: 'app-aurora',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.populate();
    }
}
