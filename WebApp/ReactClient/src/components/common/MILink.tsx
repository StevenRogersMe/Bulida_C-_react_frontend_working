import styled from 'styled-components';
import isFunction from 'lodash/isFunction';
import { SmartLink } from 'src/modules/navigation/components/SmartLink';
import { ToNavigationType } from 'src/utils/types';

type Props = {
  to: ToNavigationType | (() => void);
  label: string;
  disabled?: boolean;
  plain?: boolean;
  className?: string;
};

export const MILink = ({ to, label, disabled, plain, className }: Props) => {
  if (!isFunction(to)) {
    return (
      <StyledLink
        className={className}
        to={to}
        disabled={disabled}
        plain={plain}
      >
        {label}
      </StyledLink>
    );
  }

  const goTo = () => {
    to();
  };

  return (
    <StyledButton
      className={className}
      onClick={goTo}
      disabled={disabled}
      plain={plain}
    >
      {label}
    </StyledButton>
  );
};

const shareStyle = (props) => `
  background-color: transparent;
  line-height: 2rem;
  outline: none;
  text-decoration: none;
  border-radius: 0;
  border: none;
  border-bottom: solid 0.2rem rgba(0, 0, 0, 0);
  color: ${props.disabled ? 'rgba(33, 33, 36, 0.3)' : props.theme.colors.blue2};
  cursor: ${props.disabled ? 'default' : 'pointer'};
  padding: 0;
  ${(props) => props.theme.text.fontType.body2};

  &:hover {
    color: ${
      props.disabled ? 'rgba(33, 33, 36, 0.3)' : props.theme.colors.blue2
    };
  }

  &:active {
    color: ${props.disabled ? 'rgba(33, 33, 36, 0.3)' : props.theme.colors.blue1};
  }

  &:disabled {
    cursor: default;
  }
`;

const plainLink = (props) => `
  background-color: transparent;
  cursor: ${props.disabled ? 'auto' : 'pointer'};
  color: ${props.theme.colors.blue2};
  outline: none;
  text-decoration: none;
  border-radius: 0;
  border: none;
  padding: 0;
  ${(props) => props.theme.text.fontType.body2};
`;

const StyledLink = styled(({ plain, to, ...rest }: Props) => (
  <SmartLink to={to as ToNavigationType} {...rest} />
))`
  ${(props) => (props.plain ? plainLink(props) : shareStyle(props))}
`;

const StyledButton = styled.button<{ plain?: boolean }>`
  ${(props) => (props.plain ? plainLink(props) : shareStyle(props))}
`;
