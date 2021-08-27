import React, { SyntheticEvent } from 'react';
import { compose } from 'recompose';
import styled, { css } from 'styled-components';
import { TextInputSize } from 'src/utils/types';
import { TEXT_INPUT_SIZE } from 'src/utils/consts';
import { withBreak } from 'src/hok/withBreak';
import { MINotices } from 'src/components/common/MINotices';
import { MIInputLabel } from 'src/components/common/MIInputLabel';

export enum INPUT_TYPE {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEL = 'tel',
  SEARCH = 'search',
}

export type InputModeType =
  | 'text'
  | 'none'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search'
  | undefined;

export type InputType =
  | INPUT_TYPE.TEXT
  | INPUT_TYPE.PASSWORD
  | INPUT_TYPE.NUMBER
  | INPUT_TYPE.TEL
  | INPUT_TYPE.SEARCH;

export type MITextInputBaseProps = {
  id: string;
  value?: string | number | null;
  label: string;
  placeholder?: string;
  type?: InputType;
  step?: number;
  notices?: Array<string>;
  errorMessage?: string | null;
  errorMessageIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  readOnlyValue?: boolean;
  size?: TextInputSize;
  autoFocus?: boolean;
  viewOnly?: boolean;
  autocomplete?: string;
  min?: any;
  max?: any;
  onClick: (e: SyntheticEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  device: { isMobile: boolean };
  maxlength?: number;
  pattern?: string;
  inputMode?: InputModeType;
  suffix?: any;
  withDefaultInputArrows?: boolean;
};

type Props = MITextInputBaseProps & {
  onChange?: (changeField: { id: string; value: string }) => void;
};

type PropsPassthrough = MITextInputBaseProps & {
  onChange: (
    changeField:
      | { id: string; value: string }
      | SyntheticEvent<HTMLInputElement>
  ) => void;
};

class MITextInputBase<
  T extends MITextInputBaseProps
> extends React.PureComponent<T> {
  static defaultProps = {
    disabled: false,
    required: false,
    readOnlyValue: false,
    placeholder: '',
    notices: [],
    type: INPUT_TYPE.TEXT,
    step: undefined,
    size: TEXT_INPUT_SIZE.WIZARD,
    viewOnly: false,
    errorMessage: null,
    errorMessageIcon: null,
    autoFocus: false,
    passthroughOnChange: false,
    min: undefined,
    max: undefined,
    maxlength: undefined,
    pattern: undefined,
    inputMode: undefined,
    suffix: undefined,
    withDefaultInputArrows: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {};

  render() {
    const {
      id,
      type,
      step,
      placeholder,
      errorMessage,
      size,
      viewOnly,
      disabled,
      required,
      label,
      value,
      notices,
      onClick,
      readOnlyValue,
      onFocus,
      onBlur,
      autocomplete,
      min,
      max,
      device,
      maxlength,
      errorMessageIcon,
      pattern,
      inputMode,
      suffix,
      withDefaultInputArrows,
    } = this.props as MITextInputBaseProps;
    const placeholderText = !placeholder ? '' : placeholder;
    const autoFocus = device.isMobile ? false : this.props.autoFocus;
    return (
      <Container
        className='input-container'
        size={size}
        withDefaultInputArrows={withDefaultInputArrows}
      >
        <MIInputLabel
          inputId={id}
          label={label}
          errorMessage={errorMessage}
          size={size}
          required={required}
        />

        <InputWrapper>
          {
            <React.Fragment>
              <TextInput
                id={id}
                name={id}
                disabled={disabled}
                label={label}
                value={value == null ? '' : value}
                placeholder={placeholderText}
                error={errorMessage}
                type={type}
                step={step}
                inline={size}
                readOnly={readOnlyValue}
                viewOnly={viewOnly}
                autoFocus={autoFocus}
                onChange={this.handleChange}
                onClick={onClick}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete={autocomplete}
                min={min}
                max={max}
                maxLength={maxlength}
                pattern={pattern}
                inputMode={inputMode}
              />
            </React.Fragment>
          }
          <Suffix inline={size}>{suffix}</Suffix>
        </InputWrapper>
        <MINotices
          size={size}
          notices={notices}
          errorMessage={errorMessage}
          errorMessageIcon={errorMessageIcon}
        />
      </Container>
    );
  }
}

class PlainMITextInput extends MITextInputBase<Props> {
  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { disabled, onChange, id, type } = this.props;
    if (!disabled && onChange) {
      onChange(
        Object.assign(
          {},
          {
            id,
            value: e.currentTarget.value,
            valueAsNumber: e.currentTarget.valueAsNumber,
          },
          type ? { type } : {}
        )
      );
    }
  };
}

export const MITextInput = compose(withBreak())(PlainMITextInput);

class MITextInputPassthroughBase extends MITextInputBase<PropsPassthrough> {
  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (!this.props.disabled) {
      this.props.onChange(e);
    }
  };
}

export const MITextInputPassthrough = compose(withBreak())(
  MITextInputPassthroughBase
);

const Container = styled.div<{ size?: TextInputSize }>`
  width: 100%;
  margin-bottom: ${(props) =>
    props.size === TEXT_INPUT_SIZE.WIZARD ? '4rem' : '0'};

  ${(props) =>
    !props.withDefaultInputArrows &&
    `
    input[type=number] {
      -moz-appearance:textfield;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }
  `}
`;

const placeholderStyle = (props) => `
  color: rgba(214, 214, 216, 1);
  font-size: ${props.inline === TEXT_INPUT_SIZE.INLINE ? '1.6rem' : '2.3rem'};
  letter-spacing: -0.028rem;
`;

const fontSize = (props) => {
  if (props.type === 'password') {
    if (props.inline === TEXT_INPUT_SIZE.INLINE) {
      return '2.2rem';
    }

    return '2.3rem';
  } else if (props.inline === TEXT_INPUT_SIZE.INLINE) {
    return '1.6rem';
  }

  return '2.3rem';
};

const TextInput = styled.input.attrs<{
  inline?: TextInputSize;
  error?: string | null;
  viewOnly?: boolean;
  label?: string;
  maxLength?: number;
}>((props) => ({
  maxlength: props?.maxLength,
}))`
  width: 100%;
  height: ${(props) =>
    props.inline === TEXT_INPUT_SIZE.INLINE ? '3rem' : '3.8rem'};
  background-color: transparent;
  padding: 0 0
    ${(props) => (props.inline === TEXT_INPUT_SIZE.INLINE ? '0' : '0.5rem')} 0;
  border: none;
  border-bottom: ${(props) =>
    props.inline === TEXT_INPUT_SIZE.INLINE ? '0.1rem solid' : '0.2rem solid'};
  border-color: ${(props) =>
    props.error ? props.theme.colors.red : props.theme.colors.stroke};
  outline: none;
  line-height: ${(props) =>
    props.inline === TEXT_INPUT_SIZE.INLINE ? '3rem' : '3.8rem'};
  color: ${(props) => props.theme.colors.black1};
  border-radius: 0;

  ${(props) =>
    props.viewOnly &&
    css`
      pointer-events: none;
      color: ${(props) => props.theme.colors.stroke};
    `};

  font-size: ${(props) => fontSize(props)};

  &:-webkit-autofill::first-line {
    font-size: ${(props) => fontSize(props)};
    line-height: ${(props) =>
      props.inline === TEXT_INPUT_SIZE.INLINE ? '3rem' : '3.8rem'};
  }

  &::-webkit-input-placeholder {
    ${(props) => placeholderStyle(props)}
  }
  &::-moz-placeholder {
    ${(props) => placeholderStyle(props)}
  }

  &:-ms-input-placeholder {
    ${(props) => placeholderStyle(props)}
  }

  &::placeholder {
    ${(props) => placeholderStyle(props)}
  }

  &:focus {
    border-color: rgba(33, 33, 33, 1);
  }

  &:disabled {
    -webkit-text-fill-color: ${(props) => props.theme.colors.stroke};
    color: ${(props) => props.theme.colors.stroke}};
    opacity: 1;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  white-space: nowrap;
`;

const Suffix = styled.div<{ inline?: TextInputSize }>`
  position: absolute;
  bottom: ${(props) =>
    props.inline === TEXT_INPUT_SIZE.INLINE ? '0.5rem' : '1.3rem'};
  max-height: ${(props) =>
    props.inline === TEXT_INPUT_SIZE.INLINE ? '1.7rem' : '2.2rem'};
  max-width: ${(props) =>
    props.inline === TEXT_INPUT_SIZE.INLINE ? '1.7rem' : '2.2rem'};
  overflow: hidden;
  right: 0;
  cursor: pointer;
  font-size: ${(props) =>
    props.inline === TEXT_INPUT_SIZE.INLINE ? '1.7rem' : '2.2rem'};

  img {
    height: ${(props) =>
      props.inline === TEXT_INPUT_SIZE.INLINE ? '1.7rem' : '2.2rem'};
    width: ${(props) =>
      props.inline === TEXT_INPUT_SIZE.INLINE ? '1.7rem' : '2.2rem'};
  }
`;

export { TextInput, Container, InputWrapper };
