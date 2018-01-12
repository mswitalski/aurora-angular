import {Injectable} from '@angular/core';

/**
 * Service managing JWT tokens for user authorization.
 */
@Injectable()
export class JwtService {

    private tokenPlaceholderName = 'authorizationToken';

    getToken(): string {
        return window.localStorage[this.tokenPlaceholderName];
    }

    setToken(token: string) {
        window.localStorage[this.tokenPlaceholderName] = token;
    }

    invalidateToken() {
        window.localStorage.removeItem(this.tokenPlaceholderName);
    }
}
