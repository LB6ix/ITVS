import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import { formatDate } from '../../utility/formatDate';
import { Button } from '@material-ui/core';

const HardwareItem = ({ hardware }) => {
  const [displayAdditionalData, toggleAdditionalData] = useState(false);

  return (
    <Fragment>
      <h1 className='large text-primary'>Įrangos duomenys</h1>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Pavadinimas'
            name='name'
            value={hardware[0].name}
            disabled
          />
          <small className='form-text'>Įrangos pavadinimas</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Serijinis numeris'
            name='serialNumber'
            value={hardware[0].serialNumber}
            disabled
          />
          <small className='form-text'>Serijinis Numeris</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Kam Priskirtas'
            name='assignedTo'
            value={hardware[0].assignedTo}
            disabled
          />
          <small className='form-text'>
            Naudotojas, kuriam priskirtas turtas
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Gamintojas'
            name='manufacturer'
            value={hardware[0].manufacturer}
            disabled
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Modelis'
            name='model'
            value={hardware[0].model}
            disabled
          />
        </div>
        <div className='form-group'>
          <select name='category' value={hardware[0].category} disabled>
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
          <select name='status' value={hardware[0].status} disabled>
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
          <small className='form-text'>Įrangos statusas</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Vieta'
            name='location'
            value={hardware[0].location}
            disabled
          />
          <small className='form-text'>Dabartinė įrangos buvimo vieta</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Kaina'
            name='cost'
            value={hardware[0].cost}
            disabled
          />
        </div>

        {/* FIX THIS */}

        <Button
          onClick={() => toggleAdditionalData(!displayAdditionalData)}
          type='button'
          variant='contained'
          color='primary'
          style={{ marginBottom: '10px' }}
        >
          Peržiūrėti detalesnius duomenis
        </Button>

        {displayAdditionalData && (
          <Fragment>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Tiekėjas'
                name='supplier'
                value={hardware[0].supplier}
                disabled
              />
              <small className='form-text'>Tiekėjas</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Garantija'
                name='warranty'
                value={hardware[0].warranty}
                disabled
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Nuomos galiojimo pabaiga'
                name='leaseExpDate'
                value={hardware[0].leaseExpDate}
                disabled
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Tikėtina grąžinimo data'
                name='expectedCheckInDate'
                value={formatDate(hardware[0].expectedCheckInDate)}
                disabled
              />
              <small className='form-text'>Tikėtina atsiėmimo data</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Priskyrimo data'
                name='checkOutDate'
                value={formatDate(hardware[0].checkOutDate)}
                disabled
              />
              <small className='form-text'>Priskyrimo data</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Atsiėmimo data'
                name='checkInDate'
                value={formatDate(hardware[0].checkInDate)}
                disabled
              />
              <small className='form-text'>Atsiėmimo data</small>
            </div>
          </Fragment>
        )}
      </form>
    </Fragment>
  );
};

HardwareItem.propTypes = {
  hardware: PropTypes.object.isRequired
};

export default HardwareItem;
