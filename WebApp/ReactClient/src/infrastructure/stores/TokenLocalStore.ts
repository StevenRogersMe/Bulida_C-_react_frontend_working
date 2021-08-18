export default class TokenLocalStore {
  private static JWT_TOKEN_KEY: string = 'jwt-token';
  private static REFRESH_TOKEN_KEY: string = 'refresh-token';

  public static getJwtToken() {
    return window.localStorage.getItem(TokenLocalStore.JWT_TOKEN_KEY);
  }

  public static setJwtToken(token: string) {
    if (token === null || token === undefined) {
      return;
    }
    window.localStorage.setItem(TokenLocalStore.JWT_TOKEN_KEY, token);
  }

  public static removeJwtToken(): void {
    window.localStorage.removeItem(TokenLocalStore.JWT_TOKEN_KEY);
  }

  public static getRefreshToken() {
    return window.localStorage.getItem(TokenLocalStore.REFRESH_TOKEN_KEY);
  }

  public static setRefreshToken(token: string) {
    if (
      token === null ||
      token === undefined ||
      token === '00000000-0000-0000-0000-000000000000'
    ) {
      return;
    }
    window.localStorage.setItem(TokenLocalStore.REFRESH_TOKEN_KEY, token);
  }

  public static removeRefreshToken(): void {
    window.localStorage.removeItem(TokenLocalStore.REFRESH_TOKEN_KEY);
  }
}
