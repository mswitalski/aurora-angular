import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    templateUrl: './error-page.component.html'
})
/**
 * TODO
 */
export class ErrorPageComponent implements OnInit {

    code: number;
    title: string;
    description: string;
    private content: Map<string, string> = new Map<string, string>();
    private handledCodes: Array<number> = [409];

    constructor(private route: ActivatedRoute) {
        this.title = 'Conflict!';
        this.description = 'The entity you tried to modify is outdated';

        this.content.set('error.409.title', 'Conflict');
        this.content.set('error.409.description', 'You tried to update something while having outdated data');

        this.content.set('error.default.title', 'Unexpected error');
        this.content.set('error.default.description', 'Something went wrong and we don\'t know what, sorry!');
    }

    ngOnInit() {
        this.route.params.subscribe(
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
}
