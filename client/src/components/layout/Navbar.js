import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'> </i>
          <span className='hide-sm'> </span>
          Pagrindinis puslapis
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'> </i>
          <span className='hide-sm'> </span>
          Atsijungti
        </a>
      </li>
    </ul>
  );

  const nonAuthLinks = (
    <ul>
      <li>
        <Link to='/'>Pradinis Puslapis</Link>
      </li>
      <li>
        <Link to='/create-user'>Sukurti naudotoją</Link>
      </li>
      <li>
        <Link to='/login'>Prisijungti</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'> </i>ITVS
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : nonAuthLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  //showPageContent: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
  //showPageContent: state.showPageContent
});

export default connect(mapStateToProps, { logout })(Navbar);
