import { useState, useEffect } from 'react';
import Breakjs from 'breakjs';
import { breaks } from '../theme/appDevices';

export const appLayout = Breakjs(breaks);

export const useBreak = () => {
  const [layout, setLayout] = useState(appLayout.current());

  useEffect(() => {
    let unmounted = false;
    appLayout.addChangeListener((layout) => {
      if (!unmounted) {
        setLayout(layout);
      }
    });

    return () => {
      unmounted = true;
      appLayout.removeChangeListener();
    };
  }, []);

  return {
    isMobile: layout === 'mobile',
    isPhablet: layout === 'phablet',
    isTablet: layout === 'tablet',
    isDesktop: layout === 'desktop',
  };
};
