import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, checkAdminAuth } from '../../actions/auth';
import Sidebar from '../layout/Sidebar';

const Login = ({ login, isAuthenticated, showPageContent }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  //redirect

  // if (showPageContent) {
  //   <Sidebar>
  // }

  if (isAuthenticated) {
    return <Redirect to='/main' />;
  }

  return (
    <Fragment>
      <h5 className='large text-primary'>Prisijungti</h5>
      <p className='lead'>
        <i className='fas fa-user'></i> Prisijunkite prie savo paskyros:
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Elektroninis paštas'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Slaptažodis'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Prisijungti' />
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  showPageContent: state.auth.showPageContent
});

export default connect(mapStateToProps, { login })(Login);
