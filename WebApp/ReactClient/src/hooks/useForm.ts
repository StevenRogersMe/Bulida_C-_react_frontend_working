import { useState, useEffect } from 'react';
import set from 'lodash/fp/set';
import get from 'lodash/fp/get';
import { mapValuesDeep } from 'src/helpers/immutable-js/map-values-deep';
import { differenceDeep } from 'src/helpers/difference-deep';
import { Expandable } from 'src/utils/types';

export type ModelViewField<T> = {
  value?: T extends Record<string, any> ? Partial<T> : T extends null ? any : T;
  id: string;
  onChange: (change: Expandable<{ value: T }>) => any;
  changeAndUpdate: (change: { value: T }) => any;
  setError?: (errMessage?: string) => void;
  error?: string;
} & (T extends Record<string, any> ? ModelView<T> : Record<string, unknown>);

export type ModelView<M> = {
  [F in keyof M]-?: ModelViewField<M[F]>;
} & {
  setModelState: (state: Record<string, any>) => void;
  setValidationErrors: (state: Record<string, string>) => void;
};

export type ValidationErrors<T> = Partial<{ [F in keyof T]: string }>;

export type useFormResult<T> = [
  ModelView<T>,
  {
    submit: (
      event?:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | Event
    ) => Promise<void>;
    cancel: () => void;
  },
  ValidationErrors<T>,
  boolean
];
export type ModelViewOptions<T> = {
  submit: (value: T, changes: Partial<T>) => Promise<any>;
  onetimeModel?: boolean;
  onClear?: () => any;
  onChange?: ({ key: string, value: any, modelState: T }) => T;
};

export function useForm<T extends Record<string, unknown>>(
  model: T,
  options: ModelViewOptions<T>
): useFormResult<T> {
  const [modelState, setModelState] = useState(model);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  async function performSubmit(newValue: T) {
    const diff = differenceDeep(newValue, model);
    try {
      setLoading(true);
      await options.submit(newValue, diff);
      setLoading(false);
      return true;
    } catch (e) {
      if (e.error?.validationErrors) {
        setValidationErrors(e.error?.validationErrors);
      }

      setLoading(false);
      return false;
    }
  }
  const mv: ModelView<T> = {
    ...mapValuesDeep<T, any>(model, (value, key: string) => ({
      value: get(key, modelState),
      id: key,
      onChange({ value }) {
        if (validationErrors[key]) {
          setValidationErrors({
            ...validationErrors,
            [key]: undefined,
          });
        }

        setModelState((prevState) => {
          let newState = set(key, value, prevState);

          if (options.onChange) {
            newState = options.onChange({ key, value, modelState: newState });
          }

          return newState;
        });
      },
      changeAndUpdate({ value }) {
        setModelState((prevState) => set(key, value, prevState));
        return performSubmit(set(key, value, modelState));
      },
      setError(errMessage?: string) {
        setValidationErrors({
          ...validationErrors,
          [key]: errMessage,
        });
      },
      error: validationErrors[key],
    })),
    setModelState: setModelState as any,
    setValidationErrors: setValidationErrors as any,
  };
  useEffect(() => {
    if (!options.onetimeModel) {
      setModelState(model);
    }
  }, [model, options.onetimeModel]);

  async function submit(
    event?:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | Event
  ) {
    event && event.preventDefault();
    const res = await performSubmit(modelState);
    if (res && options.onClear) {
      options.onClear && options.onClear();
    }
  }

  function cancel() {
    setModelState(model);
    setValidationErrors({});
    options.onClear && options.onClear();
  }

  return [
    mv,
    {
      submit,
      cancel,
    },
    validationErrors,
    loading,
  ];
}
