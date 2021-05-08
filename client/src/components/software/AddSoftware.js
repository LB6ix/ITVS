import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSoftware } from '../../actions/assets/software';
import TextField from '@material-ui/core/TextField';

const AddSoftware = ({ addSoftware, history }) => {
  const [formData, setFormData] = useState({
    license: '',
    key: '',
    expDate: '',
    manufacturer: '',
    status: '',
    totalAmount: '',
    //   availAmount: '',
    assignedTo: null,
    cost: '',
    supplier: ''
  });

  const {
    license,
    key,
    expDate,
    manufacturer,
    status,
    totalAmount,
    //   availAmount,
    assignedTo,
    cost,
    supplier
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    addSoftware(formData);
    setTimeout(() => {
      history.push('/software');
    }, 1000);
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Pridėkite naują programinės įrangos įrašą</h3>
      </div>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Licencija'
            name='license'
            value={license}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Pavadinimas turi būti unikalus!</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Licencijos raktas'
            name='key'
            value={key}
            onChange={(e) => onChange(e)}
          />
        </div>
        {/* // <div className='form-group'>
        //   <input
        //     type='date'
        //     placeholder='Galiojimo data'
        //     name='expDate'
        //     value={expDate}
        //     onChange={(e) => onChange(e)} //FIXXXXXXXXX
        //   />
        // </div> */}
        <div className='form-group'>
          <input
            type='date'
            placeholder='Galiojimo data'
            name='expDate'
            value={expDate}
            onChange={(e) => onChange(e)} //FIXXXXXXXXX
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Leidėjas'
            name='manufacturer'
            value={manufacturer}
            onChange={(e) => onChange(e)} //FIXXXXXXXXX
          />
        </div>
        <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Parinkite statusą</option>
            <option value='Neaktyvi'>Neaktyvi</option>
            <option value='Aktyvi'>Aktyvi</option>
            <option value='Negaliojanti'>Negaliojanti</option>
            <option value='Kita'>Kita</option>
          </select>
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Turimas licencijų kiekis'
            name='totalAmount'
            value={totalAmount}
            min='1'
            max='100'
            onChange={(e) => onChange(e)}
          />
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
        <div className='form-group'>
          <input
            type='text'
            placeholder='Tiekėjas'
            name='supplier'
            value={supplier}
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

AddSoftware.propTypes = {
  addSoftware: PropTypes.func.isRequired
};

export default connect(null, { addSoftware })(AddSoftware);
