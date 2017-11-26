
import {Skill} from '../../../shared/model/skill.model';
import {Component, OnInit} from '@angular/core';
import {AutoUnsubscriberComponent} from '../../../shared/auto-unsubscriber.component';
import {ActivatedRoute, Router} from '@angular/router';
import {SkillsService} from '../../../shared/service/skills.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './skill-management.component.html'
})
export class SkillManagementComponent extends AutoUnsubscriberComponent implements OnInit {

    selectedSkill: Skill;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private skillsService: SkillsService,
                private translate: TranslateService) {
        super();
    }

    ngOnInit() {
        this.selectedSkill = this.route.snapshot.data['skill'];
        this.translate.get('DIALOG.CONFIRMATION').takeUntil(this.ngUnsubscribe).subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteSkill(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.skillsService.delete(this.selectedSkill).takeUntil(this.ngUnsubscribe).subscribe(
                () => this.router.navigate(['/unitleader/skills'])
            );
        }
    }
}
