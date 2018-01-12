export class ObjectsUtil {

    static clone(o: any): any {
        return JSON.parse(JSON.stringify(o));
    }
}
