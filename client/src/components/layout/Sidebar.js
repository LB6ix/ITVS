import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Sidebar = ({ auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </ul>
  );

  const nonAuthLinks = (
    <ul>
      <li>
        <Link to='/login'>Prisijungti</Link>
      </li>
    </ul>
  );

  return (
    <nav className='sidebar-nav'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i>ITVS
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : nonAuthLinks}</Fragment>
      )}
    </nav>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Sidebar);
