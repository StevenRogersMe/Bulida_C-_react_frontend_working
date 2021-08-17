import { IRestResponse } from "./models/IRestResponse";
import { RefreshTokenRequest } from "../restClient/models/RefreshTokenRequest";
import { AuthenticationResponse } from "../restClient/models/AuthenticationResponse";
import { AuthenticationErrorType } from "../restClient/models/AuthenticationErrorType";
import TokenLocalStore from "../stores/TokenLocalStore";
import JwtTokenCacheProvider from "../jwtToken/JwtTokenCacheProvider";

// Required for process.env.COPMAIGN_APP_API
require('dotenv').config();

export default class RestClient {
    public static get<TResponse>(url: string): Promise<IRestResponse<TResponse>> {
        return RestClient.request<TResponse>("GET", url, null, false);
    }

    public static delete(url: string, data?: Object | string): Promise<IRestResponse<void>> {
        return RestClient.request<void>("DELETE", url, data, false);
    }

    public static put<TResponse>(
        url: string,
        data?: Object | string
    ): Promise<IRestResponse<TResponse>> {
        return RestClient.request<TResponse>("PUT", url, data, false);
    }

    public static post<TResponse>(
        url: string,
        data?: Object | string
    ): Promise<IRestResponse<TResponse>> {
        return RestClient.request<TResponse>("POST", url, data, false);
    }

    public static postFormData<TResponse>(
        url: string,
        data: FormData
    ): Promise<IRestResponse<TResponse>> {
        return RestClient.request<TResponse>("POST", url, data, true);
    }

    public static refreshTokenRequest(): Promise<IRestResponse<AuthenticationResponse>> {
        JwtTokenCacheProvider.clearCache();

        let isBadRequest = false;
        let headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');

        const fullUrl = process.env.COPMAIGN_APP_API + 'api/authentication/refresh';

        const data = {
            jwtToken: TokenLocalStore.getJwtToken(),
            refreshToken: TokenLocalStore.getRefreshToken()
        } as RefreshTokenRequest;

        const body = JSON.stringify(data);

        return fetch(fullUrl, {
            method: 'POST',
            headers: headers,
            body: body as string
        }).then((response: any) => {
            isBadRequest = response.status === 400 || response.status === 401;

            let responseContentType = response.headers.get("content-type");
            if (responseContentType &&
                responseContentType.indexOf("application/json") !== -1
            ) {
                return response.json();
            } else {
                return response.text();
            }
        })
            .then((responseContent: any) => {
                let response: IRestResponse<AuthenticationResponse> = {
                    is_error: isBadRequest,
                    error_content: isBadRequest ? responseContent : null,
                    content: isBadRequest ? null : responseContent
                };
                return response;
            });
    }

    private static request<TResponse>(
        method: string,
        url: string,
        data?: FormData | Object | string | null,
        isFormData?: boolean
    ): Promise<IRestResponse<TResponse>> {
        let isBadRequest = false;
        let body = data;
        let headers = new Headers();

        headers.set('Authorization', `Bearer ${TokenLocalStore.getJwtToken()}`);
        headers.set('Accept', 'application/json');

        if (data && !isFormData) {
            if (typeof data === "object") {
                headers.set('Content-Type', 'application/json');
                body = JSON.stringify(data);
            } else {
                headers.set('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
        else if (data && isFormData) {
            body = data;
        }

        const fullUrl = process.env.REACT_APP_DASHBOARD_API + url;
        return fetch(fullUrl, {
            method: method,
            headers: headers,
            body: body as string
        }).then((response: any) => {
            if (response.status === 401) {
                let isSuccessRefresh = false;
                RestClient.refreshTokenRequest().then(refreshResponse => {
                    if (!refreshResponse.is_error &&
                        refreshResponse.content &&
                        refreshResponse.content.authenticationErrorType === AuthenticationErrorType.None) {
                        TokenLocalStore.setJwtToken(response.content.jwtToken);
                        TokenLocalStore.setRefreshToken(response.content.refreshToken);

                        isSuccessRefresh = true;
                    }
                    else {
                        TokenLocalStore.removeJwtToken();
                        TokenLocalStore.removeRefreshToken();

                        window.location.replace(`/?expired=1`);
                    }
                });

                if (isSuccessRefresh) {
                    return RestClient.request<TResponse>(method, url, data);
                }
            }

            isBadRequest = response.status === 400 || response.status === 500;

            let responseContentType = response.headers.get("content-type");
            if (responseContentType &&
                responseContentType.indexOf("application/json") !== -1
            ) {
                return response.json();
            } else {
                return response.text();
            }
        })
            .then((responseContent: any) => {
                let response: IRestResponse<TResponse> = {
                    is_error: isBadRequest,
                    error_content: isBadRequest ? responseContent : null,
                    content: isBadRequest ? null : responseContent
                };
                return response;
            });
    }
}