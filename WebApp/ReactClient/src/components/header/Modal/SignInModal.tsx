import { useState } from 'react';
import styled from 'styled-components';
import { FieldType } from 'src/utils/types';
import { MIModalMessage } from 'src/components/common/MIModalMessage';
import { MITextInput } from 'src/components/common/MITextInput';
import MIPasswordInput from 'src/components/common/MIPasswordInput';

type Props = {
  dismiss?: (event: React.MouseEvent) => void;
};

export const SignInModal = ({ dismiss }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
              // errorMessage={validationErrors.password}
            />
          </InputsContainer>
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
