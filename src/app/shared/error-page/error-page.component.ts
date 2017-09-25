import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './error-page.component.html'
})

export class ErrorPageComponent implements OnInit, OnDestroy {

    description: string;
    title: string;
    private handledCodes: Array<string> = ['409'];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private translate: TranslateService) {
    }

    ngOnInit() {
        this.route.params.takeUntil(this.ngUnsubscribe).subscribe(
            (params: Params) => {
                const translationKeyToGet = this.specifyErrorTranslationKey(params['code']);
                const titleKey = 'ERROR-PAGE.' + translationKeyToGet + '.TITLE';
                const descKey = 'ERROR-PAGE.' + translationKeyToGet + '.DESC';

                this.translate.get(titleKey).takeUntil(this.ngUnsubscribe).subscribe((res: string) => {
                    this.title = res;
                });
                this.translate.get(descKey).takeUntil(this.ngUnsubscribe).subscribe((res: string) => {
                    this.description = res;
                });
            }
        );
    }

    private specifyErrorTranslationKey(code: string): string {
        return this.handledCodes.includes(code) ? code : 'DEFAULT';
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
