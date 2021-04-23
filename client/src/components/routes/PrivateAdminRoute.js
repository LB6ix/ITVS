import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import checkAdminAuth from '../../utility/adminAuth';

const PrivateAdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  checkAdminAuth,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !checkAdminAuth() && !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateAdminRoute.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
  checkAdminAuth: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { checkAdminAuth })(PrivateAdminRoute);
