import styled from 'styled-components';

type Props = {
  inputId?: string;
  label: string;
  required?: boolean;
  size?: 'inline' | 'wizard';
  errorMessage?: string | null;
};

export const MIInputLabel = ({
  inputId,
  label,
  required,
  size = 'wizard',
  errorMessage,
}: Props) => {
  if (!label) return null;

  return (
    <InputLabel errorMessage={errorMessage} size={size} htmlFor={inputId}>
      {label}
      {!required && <Optional>(optional)</Optional>}
    </InputLabel>
  );
};

const InputLabel = styled.label<{
  errorMessage?: string | null;
  size?: 'inline' | 'wizard';
}>`
  min-height: 1.7rem;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.02rem;
  line-height: 1.8rem;
  display: block;
  text-align: left;
  margin-bottom: ${(props) => (props.size === 'inline' ? '0' : '0.8rem')};

  color: ${(props) => {
    if (props.errorMessage) {
      return props.theme.colors.red;
    }

    return 'rgba(153, 153, 156, 1)';
  }};
`;

const Optional = styled.span`
  font-size: 1.2rem;
  text-transform: none;
  font-weight: normal;
  margin-left: 0.5rem;
`;
