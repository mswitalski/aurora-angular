import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Router} from '@angular/router';

import {AutoUnsubscriberComponent} from '../../../shared';
import {Skill} from '../../../shared/model';
import {SkillsService} from '../../../shared/service';

@Component({
    templateUrl: './create-skill.component.html'
})
export class CreateSkillComponent extends AutoUnsubscriberComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private skillsService: SkillsService) {
        super();
    }

    submit(skill: Skill): void {
        this.skillsService.create(skill).takeUntil(this.ngUnsubscribe).subscribe(
            (receivedSkill: Skill) => {
                this.responseSubject.complete();
                const url = 'unitleader/skills/' + receivedSkill.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
