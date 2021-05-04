import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const HardwareItem = ({
  hardware: {
    name,
    serialNumber,
    manufacturer,
    model,
    category,
    status,
    assignedTo,
    location,
    expectedCheckInDate,
    checkOutDate,
    checkInDate,
    cost,
    supplier,
    warranty,
    leaseExpDate
  }
}) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Įrangos duomenys</h1>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Pavadinimas'
            name='name'
            value={name}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Serijinis numeris'
            name='serialNumber'
            value={serialNumber}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Gamintojas'
            name='manufacturer'
            value={manufacturer}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Modelis'
            name='model'
            value={model}
            disabled
          />
        </div>
        <div className='form-group'>
          <select name='category' value={category} disabled>
            <option value='0'>* Parinkite įrangos kategoriją</option>
            <option value='Kompiuteriai'>Kompiuteriai</option>
            <option value='Telefonai'>Telefonai</option>
            <option value='Monitoriai'>Monitoriai</option>
            <option value='Periferija'>Periferija</option>
            <option value='Tinklo įranga'>Tinklo įranga</option>
            <option value='Vaizdo įranga'>Tinklo įranga</option>
            <option value='Planšetės'>Planšetės</option>
            <option value='Spausdintuvai'>Spausdintuvai</option>
            <option value='Serveriai'>Serveriai</option>
          </select>
        </div>
        <div className='form-group'>
          <select name='status' value={status} disabled>
            <option value='0'>* Parinkite statusą</option>
            <option value='Paruoštas'>Paruoštas</option>
            <option value='Neparuoštas'>Neparuoštas</option>
            <option value='Priskirtas'>Priskirtas</option>
            <option value='Remontas'>Remontas</option>
            <option value='Išpirktas'>Išpirktas</option>
            <option value='Archyvuotas'>Archyvuotas</option>
            <option value='Dingęs'>Dingęs</option>
            <option value='Kita'>Kita</option>
          </select>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Vieta'
            name='location'
            value={location}
            disabled
          />
          <small className='form-text'>Dabartinė įrangos buvimo vieta</small>
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
            placeholder='Kam Priskirtas'
            name='assignedTo'
            value={assignedTo}
            disabled
          />
        </div>
        {/* FIX THIS */}
        <div className='my-2'>
          <button
            // onClick={() => toggleAdditionalData(!displayAdditionalData)}
            type='button'
            className='btn btn-light'
          >
            Peržiūrėti detalesnius duomenis
          </button>
        </div>
        {/* {displayAdditionalData && ( */}
        <Fragment>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Tiekėjas'
              name='supplier'
              value={supplier}
              disabled
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Garantija'
              name='warranty'
              value={warranty}
              disabled
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Nuomos galiojimo pabaiga'
              name='leaseExpDate'
              value={leaseExpDate}
              disabled
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Nuomos galiojimo pabaiga'
              name='expectedCheckInDate'
              value={expectedCheckInDate}
              disabled
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Nuomos galiojimo pabaiga'
              name='checkOutDate'
              value={checkOutDate}
              disabled
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Nuomos galiojimo pabaiga'
              name='checkInDate'
              value={checkInDate}
              disabled
            />
          </div>
        </Fragment>
        {/* <input type='submit' class='btn btn-primary my-1' /> */}
      </form>
    </Fragment>
  );
};

HardwareItem.propTypes = {
  hardware: PropTypes.object.isRequired
};

export default HardwareItem;
