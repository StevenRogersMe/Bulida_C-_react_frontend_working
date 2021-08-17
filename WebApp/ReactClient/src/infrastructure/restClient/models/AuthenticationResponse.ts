import { AuthenticationErrorType } from './AuthenticationErrorType';

export interface AuthenticationResponse {
    jwtToken: string;
    refreshToken: string;
    authenticationErrorType: AuthenticationErrorType;
}