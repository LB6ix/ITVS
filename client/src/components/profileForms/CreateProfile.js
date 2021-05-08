import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { withRouter, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    company: '',
    title: '',
    department: '',
    location: ''
  });

  const [displayPasswordChange, togglePasswordChange] = useState(false);

  const { phoneNumber, company, title, department, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //key = name, value changes state

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text'>Sukurkite savo profilį</h1>
      <Link to={`/main`}>
        <Button size='large' variant='contained' color='primary'>
          Grįžti pagrindinį puslapį
        </Button>
      </Link>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Įmonė'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Įmonė</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Telefono numeris'
            name='phoneNumber'
            value={phoneNumber}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Telefono numeris</small>
        </div>
        <div className='form-group'>
          <select name='title' value={title} onChange={(e) => onChange(e)}>
            <option value='0'>* Pasirinkite savo pareigas</option>
            <option value='Praktikantas'>Praktikantas</option>
            <option value='Asistentas'>Asistentas</option>
            <option value='Vyresnysis asistentas'>Vyresnysis asistentas</option>
            <option value='Vyresnysis'>Vyresnysis</option>
            <option value='Vadovas'>Vadovas</option>
            <option value='Vyresnysis vadovas'>Vyresnysis vadovas</option>
            <option value='Vadybininkas'>Vadybininkas</option>
            <option value='Direktorius'>Direktorius</option>
          </select>
          <small className='form-text'>Pareigos</small>
        </div>
        <div className='form-group'>
          <select
            name='department'
            value={department}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Pasirinkite savo skyrių</option>
            <option value='Infrastruktūra'>Infrastruktūra</option>
            <option value='Konsultacijos'>Konsultacijos</option>
            <option value='IT skyrius'>IT skyrius</option>
            <option value='Apskaita'>Apskaita</option>
            <option value='Auditas'>Auditas</option>
            <option value='Finansų skyrius'>Finansų skyrius</option>
            <option value='Pardavimų skyrius'>Pardavimų skyrius</option>
            <option value='Marketingo skyrius'>Marketingo skyrius</option>
          </select>
          <small className='form-text'>Skyrius</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Vieta'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Dabartinė darbo vieta</small>
        </div>
        <Button
          size='large'
          color='secondary'
          variant='contained'
          type='submit'
          value='submit'
          style={{ marginRight: '10px' }}
        >
          Patvirtinti
        </Button>

        {/* FIX THIS */}

        <Button
          onClick={() => togglePasswordChange(!displayPasswordChange)}
          type='button'
          size='large'
          color='secondary'
          variant='outlined'
        >
          Keisti slaptažodį
        </Button>

        {displayPasswordChange && (
          <Fragment>
            <div className='form-group'>
              <input type='text' placeholder='Slaptažodis' name='password' />
              <small className='form-text'></small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Pakartokite Slaptažodį'
                name='password2'
              />
              <small className='form-text'></small>
            </div>
          </Fragment>
        )}
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//     isAuthenticated
// })

export default connect(null, { createProfile })(withRouter(CreateProfile));
