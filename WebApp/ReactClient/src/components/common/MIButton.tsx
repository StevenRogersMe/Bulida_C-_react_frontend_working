import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { ButtonVariantType, ButtonSizeType } from 'src/utils/types';
import { BUTTON_SIZE, BUTTON_VARIANT } from 'src/utils/consts';
import { MILoader, LoaderColorType } from 'src/components/common/MILoader';

type Props = {
  label: string;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  small?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  isProcessing?: boolean;
  iconClass?: string | null;
  textTransform?: string;
  logo?: string;
  onClick?: (event: Event) => void | Promise<void>;
  className?: string;
  type: string;
};

const renderButton = (
  ButtonType,
  buttonProps,
  color = 'white' as LoaderColorType
) => (
  <ButtonType {...buttonProps}>
    {buttonProps.iconClass && <InlineIcon className={buttonProps.iconClass} />}
    {buttonProps.logo && <Image src={buttonProps.logo} alt='logo' />}
    {!buttonProps.processing && buttonProps.label}
    {buttonProps.processing && <MILoader context='button' color={color} />}
  </ButtonType>
);

const Image = styled.img`
  padding: 0 1rem;
`;

const buttonHeight = css`
  ${(props: any) => {
    switch (props.size) {
      case BUTTON_SIZE.TINY:
        return 'height: 3.2rem; line-height: 1.8rem;';
      case BUTTON_SIZE.VERY_SMALL:
        return 'height: 3.6rem; line-height: 2.2rem;';
      case BUTTON_SIZE.SMALL:
        return 'height: 4.2rem; line-height: 2rem;';
      case BUTTON_SIZE.NORMAL:
      default:
        return 'height: 5rem; line-height: 2rem;';
    }
  }}
`;

const Button = styled.button<{
  size: string;
  textTransform?: string;
  fullWidth?: boolean;
  iconClass?: string;
  processing?: boolean;
}>`
  border-radius: 1.2rem;
  border: solid 0.2rem transparent;
  cursor: pointer;
  font-size: ${(props) =>
    props.size === BUTTON_SIZE.TINY ? '1.2rem' : props.theme.text.size.button};
  font-weight: ${(props) => props.theme.text.weight.semiBold};
  ${buttonHeight}
  outline: none;
  padding: ${(props) =>
    props.size === BUTTON_SIZE.TINY ? '0 1.8rem' : '0 2.4rem'};
  min-width: ${(props) =>
    props.size === BUTTON_SIZE.TINY ? '10rem' : '12rem'};
  position: relative;
  text-transform: ${(props) =>
    props.textTransform ? props.textTransform : 'none'};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  overflow: ${(props) =>
    props.size === BUTTON_SIZE.TINY ? 'unset' : 'hidden'};
  display: ${(props) => (props.iconClass ? 'flex' : '')};
  align-items: ${(props) => (props.iconClass ? 'center' : '')};
  white-space: ${(props) =>
    props.size === BUTTON_SIZE.TINY ? 'nowrap' : 'unset'};
  &:hover {
    box-shadow: none;
  }

  &:disabled {
    box-shadow: none;
    cursor: auto;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.blue2};
  box-shadow: ${(props) => props.theme.buttons.boxShadow};
  color: ${(props) => props.theme.colors.white};

  &:hover {
    background-color: ${(props) => props.theme.colors.blue2};
  }

  &:disabled {
    color: ${(props) =>
      props.processing ? 'transparent' : 'rgba(33, 33, 36, 0.3)'};
    background-color: transparent;
    border: solid 0.1rem
      ${(props) =>
        props.processing ? props.theme.colors.blue2 : 'rgba(33, 33, 36, 0.3)'};
  }

  &:active {
    background-color: ${(props) =>
      props.processing ? props.theme.colors.blue2 : props.theme.colors.blue1};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 0.1rem solid ${(props) => props.theme.colors.stroke};
  box-shadow: none;
  color: ${(props) => props.theme.colors.blue2};

  &:hover {
    background-color: ${(props) =>
      props.processing ? 'transparent' : props.theme.colors.lightBlue2};
  }

  &:disabled {
    color: ${(props) =>
      props.processing ? 'transparent' : 'rgba(33, 33, 36, 0.3)'};
    background-color: transparent;
    border: solid 0.1rem
      ${(props) =>
        props.processing ? props.theme.colors.blue2 : 'rgba(33, 33, 36, 0.3)'};
  }

  &:active {
    background-color: ${(props) =>
      props.processing ? 'transparent' : props.theme.colors.lightBlue1};
  }
`;

const InlineIcon = styled.i`
  font-size: 1.6rem;
  margin-right: 0.8rem;
`;

export const MIButton = ({
  label,
  variant,
  size,
  disabled,
  fullWidth,
  isProcessing,
  onClick,
  iconClass,
  textTransform,
  logo,
  className,
  type,
  small,
}: Props) => {
  const shouldBeDisabled = disabled || isProcessing;

  const onClickWithEvent = useCallback(
    (event) => {
      return onClick && onClick(event);
    },
    [onClick, label] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const buttonProps = {
    disabled: shouldBeDisabled,
    size: small ? BUTTON_SIZE.SMALL : size,
    fullWidth,
    processing: isProcessing,
    onClick: onClickWithEvent,
    label,
    iconClass,
    textTransform,
    logo,
    className,
    type,
  };

  if (variant === BUTTON_VARIANT.PRIMARY) {
    return renderButton(PrimaryButton, buttonProps);
  }

  if (variant === BUTTON_VARIANT.SECONDARY) {
    return renderButton(SecondaryButton, buttonProps, 'primary');
  }

  return renderButton(Button, buttonProps, 'dark');
};

MIButton.defaultProps = {
  variant: BUTTON_VARIANT.PRIMARY,
  disabled: false,
  fullWidth: false,
  isProcessing: false,
  iconClass: null,
  size: BUTTON_SIZE.NORMAL,
  className: '',
  type: 'button',
};
