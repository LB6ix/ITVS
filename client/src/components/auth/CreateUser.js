import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { createuser } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const CreateUser = ({ setAlert, createuser }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    password: '',
    password2: ''
  });

  const { firstname, lastname, email, role, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Slaptažodžiai nesutampa', 'danger');
    } else {
      createuser({ firstname, lastname, email, role, password });
      setAlert('Naudotojas sėkmingai sukurtas!', 'success');
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        password: '',
        password2: ''
      });
      //fix
    }
  };

  return (
    <Fragment>
      <h1 className='large text'>Sukurkite naudotoją</h1>
      <div className='bg-primary p'>
        <h3>Užpildykite formą</h3>
      </div>
      <form
        className='form'
        onSubmit={(e) => onSubmit(e)}
        // onReset={handleFormReset()}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Vardas'
            name='firstname'
            value={firstname}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Pavardė'
            name='lastname'
            value={lastname}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Elektroninis paštas'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            Būtinai kurkite naudotoją tik su jo darbiniu elektroniniu paštu!
          </small>
        </div>
        <div className='form-group'>
          <select
            name='role'
            value={role}
            onChange={(e) => onChange(e)}
            required
          >
            <option value='0'>* Parinkite naudotojo rolę</option>
            <option value='member'>Darbuotojas</option>
            <option value='admin'>Administratorius</option>
          </select>
          <small className='form-text'>
            Norint sukurti administratorių, reikės patvirtinimo
          </small>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Pakartokite slaptažodį'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>

        <Button
          color='secondary'
          variant='contained'
          type='submit'
          value='Prisijungti'
        >
          Patvirtinti
        </Button>
      </form>
    </Fragment>
  );
};

CreateUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createuser: PropTypes.func.isRequired
};

export default connect(null, { setAlert, createuser })(CreateUser);
