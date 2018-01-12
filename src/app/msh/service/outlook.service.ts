import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

@Injectable()
export class OutlookService {

    private tokenPlaceholderName = 'outlookToken';
    private datePlaceholderName = 'outlookValidUntil';
    private isTokenPresentSubject = new BehaviorSubject<boolean>(false);
    private validUntil: Date;
    isTokenPresent = this.isTokenPresentSubject.asObservable();

    constructor() {
        if (window.localStorage[this.datePlaceholderName]) {
            this.validUntil = new Date(window.localStorage[this.datePlaceholderName]);
        }
        if (window.localStorage.getItem(this.tokenPlaceholderName) && this.validUntil > (new Date())) {
            this.isTokenPresentSubject.next(true);
        }
        Observable.interval(60000).takeWhile(() => true).subscribe(() => this.checkIfTokenIsStillValid());
    }

    private checkIfTokenIsStillValid(): void {
        if (this.validUntil <= (new Date())) {
            this.invalidateToken();
        }
    }

    getToken(): string {
        return window.localStorage[this.tokenPlaceholderName];
    }

    invalidateToken(): void {
        this.isTokenPresentSubject.next(false);
        window.localStorage.removeItem(this.tokenPlaceholderName);
        window.localStorage.removeItem(this.datePlaceholderName);
        this.validUntil = null;
    }

    processResponse(response: string): void {
        window.localStorage[this.tokenPlaceholderName] = response.split('&')[0].split('=')[1];
        this.validUntil = new Date();
        this.validUntil.setSeconds(this.validUntil.getSeconds() + 3480);
        window.localStorage[this.datePlaceholderName] = this.validUntil;
        this.isTokenPresentSubject.next(true);
    }

    login(): void {
        window.location.href = environment.outlookLoginUrl;
    }
}
