import React, { useState, useCallback } from 'react';
import isPlainObject from 'lodash/isPlainObject';

export type UseModalOptions = {
  onDismiss?: (result: any) => any;
  modalName?: string;
} & Record<string, any>;

export type ModalShowCallback = (params?: { [key: string]: any }) => void;
export type UseModalReturn = [
  React.ReactNode | null | false,
  ModalShowCallback,
  boolean
];

export function useModal(Component, options: UseModalOptions): UseModalReturn {
  const [state, setState] = useState({ showing: false, params: {} });
  const { modalName, ...props } = options;
  const actionName = modalName || Component.displayName;
  const { onDismiss } = options;

  const showDialog = useCallback(
    (params = {}) => {
      setState({
        showing: true,
        params: isPlainObject(params) ? params : {},
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionName]
  );

  const dismiss = useCallback(
    (result) => {
      setState({
        showing: false,
        params: {},
      });
      onDismiss && onDismiss(result);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionName, onDismiss]
  );

  const DialogComponent = state.showing && (
    <Component dismiss={dismiss} {...props} {...state.params}>
      {props.children}
    </Component>
  );
  return [DialogComponent, showDialog, state.showing];
}
