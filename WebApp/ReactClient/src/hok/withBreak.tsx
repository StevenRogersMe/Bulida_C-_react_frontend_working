import React from 'react';
import Breakjs from 'breakjs';
import { breaks } from 'src/theme/appDevices';

export const appLayout = Breakjs(breaks);

type Props = unknown;

type State = {
  layout: string;
};

export function withBreak() {
  return function (Component: any) {
    return class ComponentWithBreak extends React.PureComponent<Props, State> {
      static defaultProps = {};

      constructor(props: Props) {
        super(props);
        this.state = {
          layout: appLayout.current(),
        };
      }

      componentDidMount() {
        this._isMounted = true;
        appLayout.addChangeListener(this.onLayoutChange);
      }

      componentWillUnmount() {
        this._isMounted = false;
        appLayout.removeChangeListener(this.onLayoutChange);
      }

      onLayoutChange = (layout: string) => {
        if (this._isMounted) {
          this.setState({ layout });
        }
      };

      _isMounted = false;

      render() {
        const device = {
          isMobile: this.state.layout === 'mobile',
          isPhablet: this.state.layout === 'phablet',
          isTablet: this.state.layout === 'tablet',
          isDesktop: this.state.layout === 'desktop',
        };

        return <Component {...this.props} device={device} />;
      }
    };
  };
}
