import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Router} from '@angular/router';
import {Skill} from '../../../msh/model';
import {SkillsService} from '../../../msh/service';

@Component({
    templateUrl: './create-skill.component.html'
})
export class CreateSkillComponent {

    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private router: Router, private skillsService: SkillsService) {
    }

    submit(skill: Skill): void {
        this.skillsService.create(skill).subscribe(
            (receivedSkill: Skill) => {
                this.responseSubject.complete();
                const url = 'unitleader/skills/' + receivedSkill.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
