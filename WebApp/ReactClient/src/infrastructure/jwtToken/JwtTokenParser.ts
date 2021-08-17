import { JwtToken } from "./models/JwtToken";

export default class JwtTokenParser {
    public static parseJwtToken(jwtToken: string | null) {
        if (jwtToken == null) {
            return null;
        }

        const base64Url = jwtToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    public static getExpirationDate(jwtToken: string): Date {
        const jwtTokenObject = this.parseJwtToken(jwtToken) as JwtToken;

        // Set to Utc
        const date = new Date(0);
        date.setUTCSeconds(jwtTokenObject.exp);

        return date;
    }
}