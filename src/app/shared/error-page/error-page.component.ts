import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    templateUrl: './error-page.component.html'
})

/**
 * TODO
 */
export class ErrorPageComponent implements OnInit, OnDestroy {

    code: number;
    description: string;
    title: string;
    private content: Map<string, string> = new Map<string, string>();
    private handledCodes: Array<number> = [409];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute) {
        this.content.set('error.default.title', 'Unexpected error');
        this.content.set('error.default.description', 'Something went wrong and we don\'t know what, sorry!');

        this.content.set('error.409.title', 'Conflict');
        this.content.set('error.409.description', 'You tried to update something while having outdated data');
    }

    ngOnInit() {
        this.route.params.takeUntil(this.ngUnsubscribe).subscribe(
            (params: Params) => {
                this.code = parseInt(params['code'], 10);

                if (this.handledCodes.includes(this.code)) {
                    this.title = this.content.get('error.' + this.code + '.title');
                    this.description = this.content.get('error.' + this.code + '.description');

                } else {
                    this.title = this.content.get('error.default.title');
                    this.description = this.content.get('error.default.description');
                }
            }
        );
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
