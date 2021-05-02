import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHardware } from '../../actions/assets/hardware';

const AddHardware = ({ addHardware, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    model: '',
    category: '',
    status: '',
    location: '',
    cost: ''
  });

  const {
    name,
    serialNumber,
    model,
    category,
    status,
    location,
    cost
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addHardware(formData);
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Pridėkite naują aparatinės įrangos įrašą</h3>
      </div>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Pavadinimas'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Pavadinimas turi būti unikalus!</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Serijinis Numeris'
            name='serialNumber'
            value={serialNumber}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Modelis'
            name='model'
            value={model}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <select
            name='category'
            value={category}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Parinkite įrangos kategoriją</option>
            <option value='Kompiuteriai'>Kompiuteriai</option>
            <option value='Telefonai'>Telefonai</option>
            <option value='Monitoriai'>Monitoriai</option>
            <option value='Periferija'>Periferija</option>
            <option value='Tinklo įranga'>Tinklo įranga</option>
            <option value='Planšetės'>Planšetės</option>
            <option value='Spausdintuvai'>Spausdintuvai</option>
            <option value='Serveriai'>Serveriai</option>
          </select>
          <small className='form-text'>FIXXXXXXXXXXX</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Statusas'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Dabartinis įrangos statusas</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Vieta'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Dabartinė įrangos buvimo vieta</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Kaina'
            name='cost'
            value={cost}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        {/* FIX THIS */}
        {/* <div className='my-2'>
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
                name='password2'
              />
              <small className='form-text'></small>
            </div>
          </Fragment>
        )} */}
      </form>
    </div>
  );
};

AddHardware.propTypes = {
  addHardware: PropTypes.func.isRequired
};

export default connect(null, { addHardware })(AddHardware);