import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import AuthenticationService from 'src/services/authenticationService';
import { notifyError } from 'src/services/notifications/notificationService';



 class GoogleLoginButton extends Component  {

   handleGoogleSingIn = async (event) => {
    if (!event.tokenId) {
      notifyError({ msg: 'Unable to get tokenId from Google' });
      return;
    }
   const result = AuthenticationService.singInByGoogle(event.tokenId)

   console.log(result);
  };

  render() {
    return  <GoogleLogin
    clientId="306370337343-90vf9prad3vm4ammv78evcm49pdgebd3.apps.googleusercontent.com"
    buttonText="Google Login"
    onSuccess={this.handleGoogleSingIn}
    onFailure={this.handleGoogleSingIn}
  />;
  }
}
export default GoogleLoginButton;
