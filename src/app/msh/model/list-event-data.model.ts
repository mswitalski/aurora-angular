export class ListEventData {
    page: number;
    isFilteringEnabled: boolean;
    formData: any;

    constructor(page: number = 0, isFilteringEnabled: boolean = false, formData: any = null) {
        this.page = page;
        this.isFilteringEnabled = isFilteringEnabled;
        this.formData = formData;
    }
}
