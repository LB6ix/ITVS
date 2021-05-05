import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PersistentDrawerLeft from './components/layout/Sidebar';
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
import Hardware from './components/hardware/Hardware';
import Software from './components/software/Software';
import Softwares from './components/software/Softwares';
import Post from './components/posts/Post';
import AppBar from './components/layout/AppBar';
// import PrivateAdminRoute from './components/routes/PrivateAdminRoute';
// import auth from './reducers/auth';
import './App.css';

import { connect, Provider } from 'react-redux';
import store from './store';
import { loadUser, loadAdmin } from './actions/auth';
import setAuthToken from './utility/setAuthToken';
import AddHardware from './components/hardware/AddHardware';
import AddSoftware from './components/software/AddSoftware';
import EditHardware from './components/hardware/EditHardware';
import EditSoftware from './components/software/EditSoftware';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import { stringify } from 'uuid';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
//testingas
store.dispatch(loadUser());
//store.dispatch(loadAdmin());

// {
//   !loading && isAdmin && store.dispatch(loadAdmin());
// }
// {
//   !loading && isAuthenticated && !isAdmin && store.dispatch(loadUser());
// }

const App = ({ loading, isAuthenticated, isAdmin }) => {
  useEffect(() => {
    store.dispatch(loadUser());
    // checkAdmin();
  }, []); //componentdidmount, runs once
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}

          <Route exact path='/' component={Landing} />
          <PersistentDrawerLeft />
          {/* <AppBar /> */}
          <Alert />
          <Container maxWidth='lg'>
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
              <PrivateRoute exact path='/hardware' component={Hardwares} />
              <PrivateRoute exact path='/software' component={Softwares} />
              <PrivateRoute
                exact
                path='/hardware/add-hardware'
                component={AddHardware}
              />
              <PrivateRoute
                exact
                path='/software/add-software'
                component={AddSoftware}
              />
              <PrivateRoute exact path='/hardware/:id' component={Hardware} />
              <PrivateRoute exact path='/software/:id' component={Software} />
              <PrivateRoute
                exact
                path='/hardware/edit/:id'
                component={EditHardware}
              />
              <PrivateRoute
                exact
                path='/software/edit/:id'
                component={EditSoftware}
              />
              {/* Route render={() => <h3>not here</h3>} */}
            </Switch>
          </Container>
        </Fragment>
      </Router>
    </Provider>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
