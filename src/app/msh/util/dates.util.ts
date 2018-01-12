export class DatesUtil {

    static formatDate(date: Date): string {
        let result = date.getFullYear() + '-';
        result += ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-';
        result += (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

        return result;
    }

    static formatDateTime(date: Date): string {
        let result = DatesUtil.formatDate(date) + ' ';
        result += date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        result += ':';
        result += date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        return result;
    }
}
