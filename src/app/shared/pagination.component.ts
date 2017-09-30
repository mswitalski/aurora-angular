import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PagedResults} from './model/paged-results.model';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html'
})

export class PaginationComponent {

    activePage: number;
    totalPages: number;
    numberOfElements: number;

    @Input() set paginationData(data: PagedResults<any>) {
        this.activePage = data.number;
        this.totalPages = data.totalPages;
        this.numberOfElements = data.numberOfElements;
    }

    @Output()
    pageChanged: EventEmitter<number> = new EventEmitter();

    firstPage() {
        this.activePage = 0;
        this.pageChanged.emit(this.activePage);
    }

    lastPage() {
        this.activePage = this.totalPages - 1;
        this.pageChanged.emit(this.activePage);
    }

    previousPage() {
        if (this.activePage !== 0) {
            this.activePage--;
            this.pageChanged.emit(this.activePage);
        }
    }

    nextPage() {
        if (this.activePage + 1 < this.totalPages) {
            this.activePage++;
            this.pageChanged.emit(this.activePage);
        }
    }
}
