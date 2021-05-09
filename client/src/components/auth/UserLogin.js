import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../../actions/auth';
import { Button } from '@material-ui/core';

const UserLogin = ({
  userLogin,
  isAuthenticated,
  history,
  showPageContent
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    userLogin({ email, password });

    setTimeout(() => {
      history.push('/main');
    }, 1000);
  };

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

UserLogin.propTypes = {
  userLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  showPageContent: state.auth.showPageContent
});

export default connect(mapStateToProps, { userLogin })(UserLogin);
