export class DataCheckbox<T> {
    item: T;
    value: boolean;

    constructor(item: T, value: boolean) {
        this.item = item;
        this.value = value;
    }
}
