import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export class AutoUnsubscriberComponent implements OnDestroy {

    protected ngUnsubscribe: Subject<void> = new Subject<void>();

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
