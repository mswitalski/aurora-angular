export class PagedResults<T> {
    content: Array<T>;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: any;
    numberOfElements: number;
    first: boolean;
}
