import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    company: '',
    title: '',
    department: '',
    location: ''
  });

  const [displayPasswordChange, togglePasswordChange] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      phoneNumber: loading || !profile.phoneNumber ? '' : profile.phoneNumber,
      company: loading || !profile.company ? '' : profile.company,
      title: loading || !profile.title ? '' : profile.title,
      department: loading || !profile.department ? '' : profile.department,
      location: loading || !profile.location ? '' : profile.location
    });
  }, [loading]);

  const { phoneNumber, company, title, department, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //key = name, value changes state

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sukurkite savo profilį</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Užpildykite šią formą
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Įmonė'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            S Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Telefono numeris'
            name='phoneNumber'
            value={phoneNumber}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
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
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
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
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Vieta'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            City and state suggested (eg. Boston, MA)
          </small>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        {/* FIX THIS */}
        <div className='my-2'>
          <button
            onClick={() => togglePasswordChange(!displayPasswordChange)}
            type='button'
            className='btn btn-light'
          >
            Keisti slaptažodį
          </button>
        </div>
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
                name='passwordč'
              />
              <small className='form-text'></small>
            </div>
          </Fragment>
        )}
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);