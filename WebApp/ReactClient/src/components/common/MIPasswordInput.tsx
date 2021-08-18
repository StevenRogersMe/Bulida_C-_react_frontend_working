import * as React from 'react';
import styled from 'styled-components';
import { TEXT_INPUT_SIZE } from 'src/utils/consts';
import { TextInputSize } from 'src/utils/types';
import Eye from 'src/images/general/eye.svg';
import ClosedEye from 'src/images/general/closed-eye.svg';
import {
  MITextInput,
  MITextInputBaseProps,
} from 'src/components/common/MITextInput';

type Props = MITextInputBaseProps & {
  shouldShowValue?: boolean;
};

type State = {
  shouldShowValue: boolean;
};

class MIPasswordInput extends React.PureComponent<Props, State> {
  static defaultProps = {
    ...MITextInput.defaultProps,
    type: 'password',
    shouldShowValue: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      shouldShowValue: props.shouldShowValue || props.type !== 'password',
    };
  }

  togglePassword = () => {
    this.setState(({ shouldShowValue }) => ({
      shouldShowValue: !shouldShowValue,
    }));
  };

  inputTypeHandler = () => {
    const { type, viewOnly, inputMode } = this.props;
    const shouldShowValue = this.state.shouldShowValue && !viewOnly;

    if (shouldShowValue && type === 'password' && inputMode === 'numeric') {
      return 'number';
    } else if (shouldShowValue && type === 'password') {
      return 'text';
    }

    return type;
  };

  render() {
    const { type, size, viewOnly } = this.props;
    const shouldShowValue = this.state.shouldShowValue && !viewOnly;
    const inputType = this.inputTypeHandler();
    const passwordIcon = shouldShowValue ? Eye : ClosedEye;
    return (
      <MITextInput
        {...this.props}
        type={inputType}
        suffix={
          <EyeIcon
            src={passwordIcon}
            password={type === 'password'}
            size={size as TextInputSize}
            viewOnly={viewOnly}
            onClick={this.togglePassword}
          />
        }
      />
    );
  }
}

export default MIPasswordInput;

const EyeIcon = styled.img<{
  password?: boolean;
  size: TextInputSize;
  viewOnly?: boolean;
}>`
  display: ${(props) => (!props.viewOnly ? 'block' : 'none')};
  border: none;
  cursor: pointer;
  font-size: ${(props) =>
    props.size === TEXT_INPUT_SIZE.INLINE ? '1.7rem' : '2.2rem'};
`;
