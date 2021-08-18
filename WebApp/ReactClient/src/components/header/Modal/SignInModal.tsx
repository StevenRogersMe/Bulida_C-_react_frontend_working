import { useState } from 'react';
import styled from 'styled-components';
import { FieldType } from 'src/utils/types';
import { MIModalMessage } from 'src/components/common/MIModalMessage';
import { MITextInput } from 'src/components/common/MITextInput';
import MIPasswordInput from 'src/components/common/MIPasswordInput';
import { notifyError } from 'src/services/notifications/notificationService';
import AuthenticationService from '../../../services/authenticationService';
import { AuthenticationErrorType } from '../../../infrastructure/restClient/models/AuthenticationErrorType';

type Props = {
  dismiss?: (event: React.MouseEvent) => void;
};

  export const SignInModal = ({ dismiss }: Props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async event => {
      event.preventDefault();
    
      const authenticationResult = await AuthenticationService.authenticate(email, password);
    
        if (authenticationResult.is_error) {
          notifyError({ msg: 'Server error' });
          return;
        }
        if (authenticationResult.content?.authenticationErrorType === AuthenticationErrorType.None){
                // close modal , reload footer
        }
    
          switch (authenticationResult.content?.authenticationErrorType) {
            case AuthenticationErrorType.IsUserNotFound: 
            notifyError({ msg: 'User not found' });
              break;
            case AuthenticationErrorType.IsWrongPassword:
              notifyError({ msg: 'Wrong password' });
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
              onChange={onFieldChanged}
            />
          </InputsContainer>
          <SignUpButton onClick={handleSubmit}>Log In</SignUpButton>
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
  margin-bottom: 3rem;
`;

const ModalTitle = styled.span`
  ${(props) => props.theme.text.fontType.h4};
  font-weight: normal;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const InputsContainer = styled.div`
  margin-top: 1rem;
`;

const SignUpButton = styled.div`
  display: flex;
  align-items: center;
  padding: 2.5rem 3.3rem;
  border-radius: 1.2rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.pureWhite};
  background-color: ${(props) => props.theme.colors.blue1};

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(33, 33, 36, 0.2);
  
`;
