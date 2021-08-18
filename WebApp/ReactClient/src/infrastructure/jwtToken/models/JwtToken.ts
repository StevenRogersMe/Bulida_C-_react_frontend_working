export interface JwtToken {
  jti: string;
  iss: string;
  aud: string;
  nameid: string;
  nbf: number;
  exp: number;
  iat: number;
  given_name: string;
  family_name: string;
}
