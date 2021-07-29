import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useBreak } from 'src/hooks/useBreak';
import { LOCATIONS } from 'src/pages/locations';
import { MainPage } from 'src/pages/main/MainPage';

export const App = () => {
  const { isDesktop } = useBreak();

  return (
    <>
      {isDesktop ? (
        <Router>
          <Switch>
            <Route path={LOCATIONS.main} component={MainPage} />
          </Switch>
        </Router>
      ) : (
        <div></div>
      )}
    </>
  );
};
