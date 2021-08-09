import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';

type Props = {
  handleClickOutside: (event: React.MouseEvent<HTMLElement>) => void;
};

export const withOutsideClickHandler = (
  WrappedComponent: React.ComponentType<any>
) => {
  class Component extends React.PureComponent<Props> {
    handleClickOutside(event: React.MouseEvent<HTMLElement>) {
      const { handleClickOutside } = this.props;
      if (handleClickOutside) {
        handleClickOutside(event);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return enhanceWithClickOutside(Component);
};
