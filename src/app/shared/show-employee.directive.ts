import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from './service/auth.service';

@Directive({ selector: '[appShowEmployee]' })
export class ShowEmployeeDirective implements OnInit {

    private condition: boolean;

    constructor(
        private template: TemplateRef<any>,
        private authService: AuthService,
        private view: ViewContainerRef
    ) {}

    ngOnInit() {
        this.authService.hasEmployeeRole.subscribe(
            isEmployee => {
                if (isEmployee && this.condition || !isEmployee && !this.condition) {
                    this.view.createEmbeddedView(this.template);

                } else {
                    this.view.clear();
                }
            }
        );
    }

    @Input() set appShowEmployee(condition: boolean) {
        this.condition = condition;
    }
}
