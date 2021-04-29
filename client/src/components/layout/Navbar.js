import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: { isAuthenticated, isAdmin, loading, showPageContent },
  logout
}) => {
  const adminLinks = (
    <ul>
      <li>
        <Link to='/create-user'>Sukurti naudotoją</Link>
      </li>
      <li>
        <Link to='/main'>
          <i className='fas fa-user'> </i>
          <span className='hide-sm'> </span>
          Pagrindinis puslapis
        </Link>
      </li>
      <li>
        <Link to='/user-list'>
          <i className='fas fa-user'> </i>
          <span className='hide-sm'> </span>
          Naudotojų sąrašas
        </Link>
      </li>
      <li>
        <Link to='/posts'>Prašymai</Link>
      </li>
      <li>
        <Link to='/hardwares'>Aparatinė Įranga</Link>
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

  const authLinks = (
    <ul>
      <li>
        <Link to='/'>Pradinis Puslapis</Link>
      </li>
      <li>
        <Link to={`/posts`}>Prašymai</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'> </i>
          <span className='hide-sm'> </span>
          Atsijungti
        </a>
      </li>
      {/* <li>
        <Link to='/user-login'>Darbuotojo prisijungimas</Link>
      </li> */}
    </ul>
  );

  const nonAuthLinks = (
    <ul>
      <li>
        <Link to='/'>Pradinis Puslapis</Link>
      </li>
      {/* <li>
        <Link to='/user-login'>Darbuotojo prisijungimas</Link>
      </li> */}
    </ul>
  );

  const getLinks = (isAuthenticated, isAdmin) => {
    if (isAuthenticated && !isAdmin) {
      return authLinks;
    }
    if (isAuthenticated && isAdmin) {
      return adminLinks;
    }
    return nonAuthLinks;
  };

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'> </i>ITVS
        </Link>
      </h1>
      {!loading && <Fragment>{getLinks(isAuthenticated, isAdmin)}</Fragment>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  showPageContent: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  showPageContent: state.showPageContent
});

export default connect(mapStateToProps, { logout })(Navbar);
