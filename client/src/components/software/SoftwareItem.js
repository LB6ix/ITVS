import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utility/formatDate';

const SoftwareItem = ({
  software: {
    license,
    key,
    expDate,
    manufacturer,
    totalAmount,
    //   availAmount,
    assignedTo,
    cost,
    supplier
  }
}) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Programinės įrangos duomenys</h1>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Licencija'
            name='license'
            value={license}
            disabled
          />
          <small className='form-text'>Pavadinimas turi būti unikalus!</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Licencijos raktas'
            name='key'
            value={key}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Galiojimo data'
            name='expDate'
            value={formatDate(expDate)}
            disabled
            // onChange={(e) => onChange(e)} //FIXXXXXXXXX
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Leidėjas'
            name='manufacturer'
            value={manufacturer}
            disabled //FIXXXXXXXXX
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Turimas licencijų kiekis'
            name='totalAmount'
            value={totalAmount}
            min='1'
            max='100'
            disabled
          />
        </div>
        <div className='form-group'>
          <select name='assignedTo' value={assignedTo} disabled>
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
            placeholder='Kaina'
            name='cost'
            value={cost}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Tiekėjas'
            name='supplier'
            value={supplier}
            disabled
          />
        </div>
      </form>
    </Fragment>
  );
};

SoftwareItem.propTypes = {
  software: PropTypes.object.isRequired
};

export default SoftwareItem;
