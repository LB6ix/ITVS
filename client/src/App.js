import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Landing from './components/layout/Landing';
import CreateUser from './components/auth/CreateUser';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import MainPage from './components/mainpage/MainPage';
import CreateProfile from './components/profileForms/CreateProfile';
import EditProfile from './components/profileForms/EditProfile';
import PrivateRoute from './components/routes/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import PrivateAdminRoute from './components/routes/PrivateAdminRoute';
import auth from './reducers/auth';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { checkAdminAuth, loadAdmin, loadUser } from './actions/auth';
import setAuthToken from './utility/setAuthToken';
import { stringify } from 'uuid';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
//testingas
store.dispatch(loadUser());
//store.dispatch(loadAdmin());

const App = () => {
  useEffect(() => {
    //testingas
    //checkAdminAuth();
    store.dispatch(loadUser());
  }, []); //componentdidmount, runs once
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* {console.log(this.state.showPageContent)} */}
          {/* {this.props.showPageContent ? null : <Navbar />}
          <Sidebar /> */}
          {/* {isAuthenticated ? <Sidebar /> : <Navbar />} */}
          <Sidebar />
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/create-user' component={CreateUser} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/profile-list' component={Profiles} />
              <PrivateRoute exact path='/main' component={MainPage} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
