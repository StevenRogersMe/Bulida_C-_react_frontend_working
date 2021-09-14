import { useState } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { FieldType } from 'src/utils/types';
import { MIModalMessage } from 'src/components/common/MIModalMessage';
import { notifySuccess } from 'src/services/notifications/notificationService';
import { MIButton } from 'src/components/common/MIButton';
import MIPasswordInput from 'src/components/common/MIPasswordInput';

type Props = {
  dismiss?: (event: React.MouseEvent) => void;
};

export const ResetPasswordModal = ({ dismiss }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<Record<string, any>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setValidationErrors({});

    if (!isEqual(password, confirmedPassword)) {
      setValidationErrors({ confirmedPassword: 'Passwords did not match' });
      setLoading(false);
    } else if (isEmpty(validationErrors)) {
      notifySuccess({
        msg: 'Password was successfully changed',
      });
      setLoading(false);
      dismiss && dismiss(event);
    }
  };

  const onFieldChanged = ({ id, value }: FieldType) => {
    if (id === 'password') {
      setPassword(value);
    }

    if (id === 'confirmedPassword') {
      setConfirmedPassword(value);
    }
  };

  return (
    <MIModalMessage
      dismiss={dismiss}
      titleComponent={
        <ModalTitleContainer>
          <ModalTitle>
            <Bold>Reset password</Bold>
          </ModalTitle>
          <InputsContainer>
            <MIPasswordInput
              id='password'
              value={password}
              label='New password'
              required
              errorMessage={validationErrors.password}
              onChange={onFieldChanged}
            />

            <MIPasswordInput
              id='confirmedPassword'
              value={confirmedPassword}
              label='Confirm password'
              required
              errorMessage={validationErrors.confirmedPassword}
              onChange={onFieldChanged}
            />
          </InputsContainer>
          <MIButton
            label='Reset password'
            type='submit'
            onClick={handleSubmit}
            isProcessing={loading}
            fullWidth
          />
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
  margin-bottom: 1rem;
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
