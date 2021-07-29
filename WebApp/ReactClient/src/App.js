import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LOCATIONS } from 'src/pages/locations';
import { MainPage } from 'src/pages/main/MainPage';
import { ErrorBoundary } from 'src/pages/error/ErrorBoundary';
import { AppLayout } from 'src/components/layout/AppLayout';

export const App = () => {
  return (
    <ErrorBoundary>
      <AppLayout>
        <Router>
          <Switch>
            <Route path={LOCATIONS.main} component={MainPage} />
          </Switch>
        </Router>
      </AppLayout>
    </ErrorBoundary>
  );
};
