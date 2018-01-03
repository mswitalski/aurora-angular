import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from './service';

@Directive({selector: '[appAuthenticatedOnly]'})
export class AuthenticatedOnlyDirective implements OnInit {

    private condition: boolean;

    constructor(private template: TemplateRef<any>,
                private authService: AuthService,
                private view: ViewContainerRef) {
    }

    ngOnInit() {
        this.authService.isAuthenticated.subscribe(
            (isAuthenticated: boolean) => {
                if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.view.createEmbeddedView(this.template);

                } else {
                    this.view.clear();
                }
            }
        );
    }

    @Input() set appAuthenticatedOnly(condition: boolean) {
        this.condition = condition;
    }
}
