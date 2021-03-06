import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Overlay from './components/layout/Overlay';
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
import Logs from './components/logs/Logs';
import Hardwares from './components/hardware/Hardwares';
import Hardware from './components/hardware/Hardware';
import Software from './components/software/Software';
import Softwares from './components/software/Softwares';
import Post from './components/posts/Post';
import { makeStyles } from '@material-ui/core/styles';
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
import CheckOutHardware from './components/hardware/CheckOutHardware';
import CheckInHardware from './components/hardware/CheckInHardware';
import CheckInSoftware from './components/software/CheckInSoftware';
import CheckOutSoftware from './components/software/CheckOutSoftware';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
//testingas
store.dispatch(loadAdmin());

const useStyles = makeStyles((theme) => ({
  MuiContainerroot: {
    width: '100%',
    display: 'block',
    boxSizing: 'border-box',
    marginLeft: '12%',
    marginRight: '12%',
    paddingLeft: '16px',
    paddingRight: '16px'
  }
}));

const App = ({ loading, isAuthenticated, isAdmin }) => {
  useEffect(() => {
    store.dispatch(loadAdmin());
  }, []); //componentdidmount, runs once

  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}

          <Route exact path='/' component={Landing} />
          <Overlay />
          <Alert />
          <Container className={classes.MuiContainerroot}>
            <Switch>
              <Route exact path='/user-login' component={UserLogin} />
              <Route exact path='/admin-login' component={AdminLogin} />
              <PrivateRoute exact path='/create-user' component={CreateUser} />
              <PrivateRoute exact path='/user-list' component={Profiles} />
              <PrivateRoute exact path='/profile/:id' component={Profile} />
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
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/logs' component={Logs} />
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
              <PrivateRoute
                exact
                path='/hardware/single/:id'
                component={Hardware}
              />
              <PrivateRoute
                exact
                path='/software/single/:id'
                component={Software}
              />
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
              <PrivateRoute
                exact
                path='/hardware/:id/checkout'
                component={CheckOutHardware}
              />
              <PrivateRoute
                exact
                path='/hardware/:id/checkin'
                component={CheckInHardware}
              />
              <PrivateRoute
                exact
                path='/software/:id/checkout'
                component={CheckOutSoftware}
              />
              <PrivateRoute
                exact
                path='/software/:id/checkin'
                component={CheckInSoftware}
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
