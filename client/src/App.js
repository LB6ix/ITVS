import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import CreateUser from './components/auth/CreateUser';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utility/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
store.dispatch(loadUser());

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //componentdidmount, runs once
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/create-user" component={CreateUser} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
