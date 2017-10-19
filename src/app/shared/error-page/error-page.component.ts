import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {TranslateService} from '@ngx-translate/core';
import {AutoUnsubscriberComponent} from '../auto-unsubscriber.component';

@Component({
    templateUrl: './error-page.component.html'
})
export class ErrorPageComponent extends AutoUnsubscriberComponent implements OnInit {

    description: string;
    title: string;
    private handledCodes: Array<string> = ['404', '412'];

    constructor(private route: ActivatedRoute, private translate: TranslateService) {
        super();
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
}
