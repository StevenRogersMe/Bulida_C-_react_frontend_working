import { GoogleLogin } from 'react-google-login';
import AuthenticationService from 'src/services/authenticationService';

export const GoogleLoginButton = () => {
  const handleGoogleSingIn = async (event) => {
    console.log(event);
    if (!event.tokenId) {
      console.error('Unable to get tokenId from Google', event);
      return;
    }
    const result = AuthenticationService.singInByGoogle(event.tokenId);

    console.log(result);
  };

  return (
    <GoogleLogin
      clientId='306370337343-90vf9prad3vm4ammv78evcm49pdgebd3.apps.googleusercontent.com'
      buttonText='Sign in with Google'
      onSuccess={handleGoogleSingIn}
      onFailure={handleGoogleSingIn}
    />
  );
};
