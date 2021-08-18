import { JwtToken } from './models/JwtToken';
import { UserModel } from './models/UserModel';
import TokenLocalStore from '../stores/TokenLocalStore';
import JwtTokenParser from './JwtTokenParser';

export default class JwtTokenCacheProvider {
  private static jwtToken: JwtToken | null = null;

  public static getJwtToken(): JwtToken | null {
    if (this.jwtToken === null) {
      const jwtTokenString = TokenLocalStore.getJwtToken();
      this.jwtToken = JwtTokenParser.parseJwtToken(jwtTokenString);
    }

    return this.jwtToken;
  }

  public static getExpirationMilliseconds(): number {
    const jwtToken = JwtTokenCacheProvider.getJwtToken();
    if (jwtToken === null) {
      return 0;
    }

    const jwtTokenMilliseconds = jwtToken.exp * 1000;
    return jwtTokenMilliseconds;
  }

  public static getUser(): UserModel | null {
    const jwtToken = JwtTokenCacheProvider.getJwtToken();
    if (jwtToken === null) {
      return null;
    }
    const userModel = {
      firstName: jwtToken.given_name,
      lastName: jwtToken.family_name,
      id: jwtToken.nameid,
    } as UserModel;

    return userModel;
  }

  public static clearCache(): void {
    this.jwtToken = null;
  }
}
