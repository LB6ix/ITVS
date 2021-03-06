import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { adminLogin } from '../../actions/auth';
import { Button } from '@material-ui/core';

const AdminLogin = ({ adminLogin, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    adminLogin({ email, password });
    setTimeout(() => {
      history.push('/main');
    }, 1000);
  };

  //redirect

  // if (showPageContent) {
  //   <Sidebar>
  // }

  if (isAuthenticated) {
    setTimeout(() => {
      return <Redirect to='/main' />;
    }, 2000);
  }

  return (
    <Fragment>
      <h5 className='large text'>Prisijungti</h5>
      <div className='bg-primary p'>
        <h3>Prisijunkite prie administratoriaus paskyros:</h3>
      </div>
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
        <Button
          color='primary'
          variant='contained'
          type='submit'
          value='Prisijungti'
        >
          Prisijungti
        </Button>
      </form>
    </Fragment>
  );
};

AdminLogin.propTypes = {
  adminLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  showPageContent: state.auth.showPageContent
});

export default connect(mapStateToProps, { adminLogin })(AdminLogin);
