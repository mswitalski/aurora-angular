import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';

import {AutoUnsubscriberComponent} from '../../../shared';
import {Skill} from '../../../shared/model';
import {SkillsService} from '../../../shared/service';

@Component({
    templateUrl: './edit-skill.component.html'
})
export class EditSkillComponent extends AutoUnsubscriberComponent implements OnInit {

    skill: Skill;
    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) {
        super();
    }

    ngOnInit(): void {
        this.skill = this.route.snapshot.data['skill'];
    }

    submit(skill: Skill): void {
        this.skillsService.update(skill).takeUntil(this.ngUnsubscribe).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'unitleader/skills/' + skill.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
