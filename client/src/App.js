import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Landing from './components/layout/Landing';
import CreateUser from './components/auth/CreateUser';
import UserLogin from './components/auth/UserLogin';
import AdminLogin from './components/auth/AdminLogin';
import Alert from './components/layout/Alert';
import MainPage from './components/mainpage/MainPage';
import CreateProfile from './components/profileForms/CreateProfile';
import EditProfile from './components/profileForms/EditProfile';
import PrivateRoute from './components/routes/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';
import Posts from './components/posts/Posts';
import Hardwares from './components/hardware/Hardwares';
import Post from './components/posts/Post';
// import PrivateAdminRoute from './components/routes/PrivateAdminRoute';
// import auth from './reducers/auth';
import './App.css';

import { connect, Provider } from 'react-redux';
import store from './store';
import { loadUser, loadAdmin } from './actions/auth';
import setAuthToken from './utility/setAuthToken';
import { check } from 'express-validator';
// import { stringify } from 'uuid';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
//testingas
store.dispatch(loadAdmin());
//store.dispatch(loadAdmin());

// {
//   !loading && isAdmin && store.dispatch(loadAdmin());
// }
// {
//   !loading && isAuthenticated && !isAdmin && store.dispatch(loadUser());
// }

const App = ({ loading, isAuthenticated, isAdmin }) => {
  useEffect(() => {
    store.dispatch(loadAdmin());
    // checkAdmin();
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
              <Route exact path='/user-login' component={UserLogin} />
              <Route exact path='/admin-login' component={AdminLogin} />
              <PrivateRoute exact path='/create-user' component={CreateUser} />
              <PrivateRoute exact path='/user-list' component={Profiles} />
              <PrivateRoute exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/main' component={MainPage} />
              {/* <PrivateRoute exact path='/userposts/:id' component={Posts} /> */}
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
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
              <PrivateRoute exact path='/hardwares' component={Hardwares} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
