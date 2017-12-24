import {Skill} from '../../../shared/model';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SkillsService} from '../../../shared/service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: './skill-management.component.html'
})
export class SkillManagementComponent implements OnInit {

    selectedSkill: Skill;
    private deleteDialogMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private skillsService: SkillsService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.selectedSkill = this.route.snapshot.data['skill'];
        this.translate.get('DIALOG.CONFIRMATION').subscribe(
            msg => this.deleteDialogMessage = msg
        );
    }

    deleteSkill(): void {
        if (confirm(this.deleteDialogMessage)) {
            this.skillsService.delete(this.selectedSkill).subscribe(
                () => this.router.navigate(['/unitleader/skills'])
            );
        }
    }
}
