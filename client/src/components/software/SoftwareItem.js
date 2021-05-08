import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utility/formatDate';

const SoftwareItem = ({ software }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Programinės įrangos duomenys</h1>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Licencija'
            name='license'
            value={software[0].license}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Licencijos raktas'
            name='key'
            value={software[0].key}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Naudotojas, kuriam priskirta'
            name='assignedTo'
            value={software[0].assignedTo}
            disabled
          />
          <small className='form-text'>
            Naudotojas, kuriam priskirta programinė įranga
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Galiojimo data'
            name='expDate'
            value={formatDate(software[0].expDate)}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Leidėjas'
            name='manufacturer'
            value={software[0].manufacturer}
            disabled //FIXXXXXXXXX
          />
        </div>
        <div className='form-group'>
          <select name='status' value={software[0].status} disabled>
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
            value={software[0].totalAmount}
            min='1'
            max='100'
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Kaina'
            name='cost'
            value={software[0].cost}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Tiekėjas'
            name='supplier'
            value={software[0].supplier}
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
