import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from './service';

@Directive({selector: '[appShowUnitLeader]'})
export class ShowUnitLeaderDirective implements OnInit {

    private condition: boolean;

    constructor(private template: TemplateRef<any>,
                private authService: AuthService,
                private view: ViewContainerRef) {
    }

    ngOnInit() {
        this.authService.hasUnitLeaderRole.subscribe(
            (isUnitLeader: boolean) => {
                if (isUnitLeader && this.condition || !isUnitLeader && !this.condition) {
                    this.view.createEmbeddedView(this.template);

                } else {
                    this.view.clear();
                }
            }
        );
    }

    @Input() set appShowUnitLeader(condition: boolean) {
        this.condition = condition;
    }
}
