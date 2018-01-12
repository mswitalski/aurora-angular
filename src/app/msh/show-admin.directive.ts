import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from './service';

@Directive({selector: '[appShowAdmin]'})
export class ShowAdminDirective implements OnInit {

    private condition: boolean;

    constructor(private template: TemplateRef<any>,
                private authService: AuthService,
                private view: ViewContainerRef) {
    }

    ngOnInit() {
        this.authService.hasAdminRole.subscribe(
            (isAdmin: boolean) => {
                if (isAdmin && this.condition || !isAdmin && !this.condition) {
                    this.view.createEmbeddedView(this.template);

                } else {
                    this.view.clear();
                }
            }
        );
    }

    @Input() set appShowAdmin(condition: boolean) {
        this.condition = condition;
    }
}
