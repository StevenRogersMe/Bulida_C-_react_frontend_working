import { useState } from 'react';
import styled from 'styled-components';
import { FieldType } from 'src/utils/types';
import { MIModalMessage } from 'src/components/common/MIModalMessage';
import { GoogleLoginButton } from 'src/components/common/GoogleLoginButton';
import { MITextInput } from 'src/components/common/MITextInput';
import MIPasswordInput from 'src/components/common/MIPasswordInput';
import { notifyInfo } from 'src/services/notifications/notificationService';
import AuthenticationService from 'src/services/authenticationService';
import { AuthenticationErrorType } from 'src/infrastructure/restClient/models/AuthenticationErrorType';
import { MIButton } from 'src/components/common/MIButton';

type Props = {
  dismiss?: (event: React.MouseEvent) => void;
  setIsSignedIn: (value: boolean) => void;
};

export const SignInModal = ({ dismiss, setIsSignedIn }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const authenticationResult = await AuthenticationService.authenticate(
      email,
      password
    );

    if (authenticationResult.is_error) {
      setLoading(false);
      notifyInfo({ msg: 'Server error.' });
      return;
    }
    if (
      authenticationResult.content?.authenticationErrorType ===
      AuthenticationErrorType.None
    ) {
      setLoading(false);
      setIsSignedIn(true);
      dismiss && dismiss(event);
    }

    switch (authenticationResult.content?.authenticationErrorType) {
      case AuthenticationErrorType.IsUserNotFound:
        setLoading(false);
        notifyInfo({ msg: 'User not found' });
        break;
      case AuthenticationErrorType.IsWrongPassword:
        setLoading(false);
        notifyInfo({ msg: 'Wrong password' });
        break;
      default:
        break;
    }
  };

  const onFieldChanged = ({ id, value }: FieldType) => {
    if (id === 'email') {
      setEmail(value);
    }

    if (id === 'password') {
      setPassword(value);
    }
  };

  return (
    <MIModalMessage
      dismiss={dismiss}
      titleComponent={
        <ModalTitleContainer>
          <ModalTitle>
            Log <Bold>In</Bold>
          </ModalTitle>
          <InputsContainer>
            <MITextInput
              id='email'
              value={email}
              label='Email'
              onChange={onFieldChanged}
              autoFocus
              autocomplete='username email'
              type='email'
              required
              // errorMessage={validationErrors.email}
            />

            <MIPasswordInput
              id='password'
              value={password}
              label='Password'
              required
              // errorMessage={validationErrors.password}
              onChange={onFieldChanged}
            />
          </InputsContainer>
          <MIButton
            label='Log In'
            type='submit'
            onClick={handleSubmit}
            isProcessing={loading}
            fullWidth
          />
          <BottomButtonOrSeparator>
            <OrText>Or</OrText>
          </BottomButtonOrSeparator>
          <GoogleLoginButton />
        </ModalTitleContainer>
      }
    />
  );
};

const ModalTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalTitle = styled.span`
  ${(props) => props.theme.text.fontType.h4};
  font-weight: 300;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const InputsContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const OrText = styled.span`
  font-size: ${(props) => props.theme.text.size.hint};
  color: ${(props) => props.theme.colors.grey1};
  padding: 0 1.5rem;
  background-color: #f7fafc;
`;

const BottomButtonOrSeparator = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.grey5};
  line-height: 0.1rem;
  padding-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
