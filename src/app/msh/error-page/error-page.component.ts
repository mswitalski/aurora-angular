import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {

    description: string;
    title: string;
    private handledCodes: Array<string> = ['403', '404', '412'];

    constructor(private route: ActivatedRoute, private translate: TranslateService) {
    }

    ngOnInit() {
        const translationKeyToGet = this.specifyErrorTranslationKey(this.route.snapshot.params['code']);
        const titleKey = 'ERROR-PAGE.' + translationKeyToGet + '.TITLE';
        const descKey = 'ERROR-PAGE.' + translationKeyToGet + '.DESC';

        this.translate.get(titleKey).subscribe((res: string) => {
            this.title = res;
        });
        this.translate.get(descKey).subscribe((res: string) => {
            this.description = res;
        });
    }

    private specifyErrorTranslationKey(code: string): string {
        return this.handledCodes.includes(code) ? code : 'DEFAULT';
    }
}
