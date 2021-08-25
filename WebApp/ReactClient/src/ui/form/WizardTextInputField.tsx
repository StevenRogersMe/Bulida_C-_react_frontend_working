import { ReactNode, RefObject } from 'react';
import { MITextInput } from 'src/components/common/MITextInput';
import { ModelViewField } from 'src/hooks/useForm';

export type WizardTextInputFieldProps = {
  id?: string;
  value?: string;
  label: string;
  placeholder?: string;
  type?: string;
  notices?: string[];
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  viewOnly?: boolean;
  autocomplete?: string;
  maxlength?: number;
  inputRef?: RefObject<any>;
  suffix?: ReactNode;
  hint?: string;
  onChange?: (event: { value: string }) => any;
  model?: ModelViewField<string>;
};

export function WizardTextInputField(props: WizardTextInputFieldProps) {
  const { model, hint, ...rest } = props;
  const value = props.value === undefined ? model?.value : props.value;
  const onChange = props.onChange || model?.onChange;
  const id = props.id || model?.id;
  return (
    <MITextInput
      {...rest}
      value={value}
      onChange={onChange}
      id={id}
      size='none'
      errorMessage={model?.error}
      notices={hint && [hint]}
    />
  );
}
