import RestClient from '../infrastructure/restClient/RestClient';
import { AuthenticationResponse } from '../infrastructure/restClient/models/AuthenticationResponse';
import { AuthenticationRequest } from '../infrastructure/restClient/models/AuthenticationRequest';
import { AuthenticationErrorType } from '../infrastructure/restClient/models/AuthenticationErrorType';
import JwtTokenCacheProvider from '../infrastructure/jwtToken/JwtTokenCacheProvider';
import TokenLocalStore from '../infrastructure/stores/TokenLocalStore';
import { GoogleRequest } from '../infrastructure/restClient/models/GoogleRequest';

export default class AuthenticationService {
  public static async isSignedIn(): Promise<boolean> {
    const jwtTokenMilliseconds =
      JwtTokenCacheProvider.getExpirationMilliseconds();
    if (jwtTokenMilliseconds === 0) {
      return false;
    }

    if (jwtTokenMilliseconds > Date.now()) {
      return true;
    }

    const response = await RestClient.refreshTokenRequest();
    if (
      response.content?.authenticationErrorType ===
        AuthenticationErrorType.None &&
      response.content.jwtToken &&
      response.content.refreshToken
    ) {
      TokenLocalStore.setJwtToken(response.content.jwtToken);
      TokenLocalStore.setRefreshToken(response.content.refreshToken);

      return true;
    }

    TokenLocalStore.removeJwtToken();
    TokenLocalStore.removeRefreshToken();

    return false;
  }

  public static singInByGoogle(googleToken : string){
    const request = {TokenId :googleToken} as GoogleRequest;
    
    return RestClient.post<AuthenticationResponse>(
      `api/authentication/google-login`,
      request
    ).then((response) => {
      if (!response.is_error && response.content) {
        TokenLocalStore.setJwtToken(response.content.jwtToken);
        TokenLocalStore.setRefreshToken(response.content.refreshToken);
      }
      return response;
    });
  }

  public static authenticate(email: string, password: string) {
    JwtTokenCacheProvider.clearCache();
    const request = { email, password } as AuthenticationRequest;

    return RestClient.post<AuthenticationResponse>(
      `api/authentication/token`,
      request
    ).then((response) => {
      if (!response.is_error && response.content) {
        TokenLocalStore.setJwtToken(response.content.jwtToken);
        TokenLocalStore.setRefreshToken(response.content.refreshToken);
      }
      return response;
    });
  }

  public static signOut(): void {
    JwtTokenCacheProvider.clearCache();

    TokenLocalStore.removeJwtToken();
    TokenLocalStore.removeRefreshToken();
  }
}
