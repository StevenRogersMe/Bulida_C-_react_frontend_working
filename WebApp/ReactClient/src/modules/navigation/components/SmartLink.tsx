import React, { memo } from 'react';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import {
  useParams,
  useLocation,
  generatePath,
  NavLink,
} from 'react-router-dom';
import { Location, Pathname } from 'history';
import { ToNavigationType } from 'src/utils/types';

function getTemplatePathFromTo(to: Location<any> | Pathname) {
  if (isObject(to)) {
    return to.pathname;
  } else if (isFunction(to)) {
    return to();
  }

  return to;
}
function composeRouteInfo(to: any, params, state) {
  const pathname = generatePath(getTemplatePathFromTo(to), params);

  return {
    state,
    ...(isObject(to) ? to : {}),
    pathname,
  };
}

export type SmartLinkProps = {
  className?: string;
  to: ToNavigationType;
  replace?: boolean;
  children?: React.ReactNode;
  params?: any;
  testId?: string;
  preserveState?: boolean;
};

export const SmartLink = memo((props: SmartLinkProps) => {
  // eslint-disable-next-line prefer-const
  let { to, params, preserveState, testId, children, ...rest } = props;
  params = merge(useParams(), params);
  const location = useLocation();
  const routeInfo = composeRouteInfo(
    to,
    params,
    preserveState ? location.state : {}
  );
  return (
    <NavLink to={routeInfo} data-testid={testId} {...rest}>
      {children}
    </NavLink>
  );
});
