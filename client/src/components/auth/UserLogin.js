import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../../actions/auth';
// import Sidebar from '../layout/Sidebar';

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
      {
        history.push('/main');
      }
    }, 500);
  };

  //redirect

  // if (showPageContent) {
  //   <Sidebar>
  // }
  if (isAuthenticated)
    setTimeout(() => {
      {
        return <Redirect to='/main' />;
      }
    }, 2000);

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

UserLogin.propTypes = {
  userLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  showPageContent: state.auth.showPageContent
});

export default connect(mapStateToProps, { userLogin })(UserLogin);