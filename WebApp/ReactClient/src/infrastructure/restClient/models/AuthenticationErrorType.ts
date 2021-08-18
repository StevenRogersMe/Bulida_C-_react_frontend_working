export enum AuthenticationErrorType {
  None = 0,
  IsUserNotFound = 1,
  IsWrongPassword = 2,
  IsTokenInvalid = 3,
  IsNotExpired = 4,
  IsExpired = 5,
  IsTokenNotFound = 6,
  IsTokenUsed = 7,
}
