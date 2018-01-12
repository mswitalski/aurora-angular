import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {DutiesService} from '../../../../msh/service';
import {Duty} from '../../../../msh/model';
import {ObjectsUtil} from '../../../../msh/util';

@Component({
    templateUrl: './edit-duty.component.html'
})
export class EditDutyComponent implements OnInit {

    duty: Duty;
    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private route: ActivatedRoute, private router: Router, private dutiesService: DutiesService) {
    }

    ngOnInit(): void {
        this.duty = ObjectsUtil.clone(this.route.snapshot.data['duty']);
    }

    submit(duty: Duty): void {
        this.dutiesService.update(duty).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'unitleader/duties/' + duty.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
