import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, IndexRoute } from 'react-router-dom';
import NotFoundPage from 'components/common/NotFoundPage';
import AirportListContainer from 'components/airports/list/AirportListContainer';
import CountryListContainer from 'components/countries/list/CountryListContainer';
import AirlineListContainer from 'components/airlines/list/AirlineListContainer';
import PageLayout from 'components/common/PageLayout';

function RouteWrapper({
  component: Component, 
  layout: Layout, 
  ...rest
}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}

const router = (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/airports" />
      </Route>
      <Route exact path="/airports" render={() => <PageLayout><AirportListContainer /></PageLayout>} />
      <Route exact path="/countries" render={() => <PageLayout><CountryListContainer /></PageLayout>} />
      <Route exact path="/airlines" render={() => <PageLayout><AirlineListContainer /></PageLayout>} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default router;