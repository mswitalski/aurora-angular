import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import {Skill} from '../../../msh/model';
import {SkillsService} from '../../../msh/service';
import {ObjectsUtil} from '../../../msh/util';

@Component({
    templateUrl: './edit-skill.component.html'
})
export class EditSkillComponent implements OnInit {

    skill: Skill;
    responseSubject = new ReplaySubject<HttpErrorResponse>(1);

    constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) {
    }

    ngOnInit(): void {
        this.skill = ObjectsUtil.clone(this.route.snapshot.data['skill']);
    }

    submit(skill: Skill): void {
        this.skillsService.update(skill).subscribe(
            () => {
                this.responseSubject.complete();
                const url = 'unitleader/skills/' + skill.id;
                this.router.navigate([url]);
            },
            err => this.responseSubject.next(err)
        );
    }
}
