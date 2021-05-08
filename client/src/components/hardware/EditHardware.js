import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editHardware, getHardware } from '../../actions/assets/hardware';
//import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import formatDate from '../../utility/formatDate';
import Loading from '../layout/Loading';

const EditHardware = ({
  hardware: { hardware, loading },
  getHardware,
  editHardware,
  match
}) => {
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
    category: '',
    status: '',
    location: '',
    cost: '',
    supplier: '',
    warranty: '',
    leaseExpDate: ''
  });
  const [displayAdditionalData, toggleAdditionalData] = useState(false);

  useEffect(() => {
    getHardware(match.params.id);

    setFormData({
      name: loading || !hardware[0].name ? '' : hardware[0].name,
      serialNumber:
        loading || !hardware[0].serialNumber ? '' : hardware[0].serialNumber,
      manufacturer:
        loading || !hardware[0].manufacturer ? '' : hardware[0].manufacturer,
      model: loading || !hardware[0].model ? '' : hardware[0].model,
      category: loading || !hardware[0].category ? '' : hardware[0].category,
      status: loading || !hardware[0].status ? '' : hardware[0].status,
      location: loading || !hardware[0].location ? '' : hardware[0].location,
      assigned: loading || !hardware[0].assigned ? '' : hardware[0].assigned,
      assignedTo:
        loading || !hardware[0].assignedTo ? '' : hardware[0].assignedTo,
      expectedCheckInDate:
        loading || !hardware[0].expectedCheckInDate
          ? ''
          : hardware[0].expectedCheckInDate,
      checkOutDate:
        loading || !hardware[0].checkOutDate ? '' : hardware[0].checkOutDate,
      checkInDate:
        loading || !hardware[0].checkInDate ? '' : hardware[0].checkInDate,
      cost: loading || !hardware[0].cost ? '' : hardware[0].cost,
      supplier: loading || !hardware[0].supplier ? '' : hardware[0].supplier,
      warranty: loading || !hardware[0].warranty ? '' : hardware[0].warranty,
      leaseExpDate:
        loading || !hardware[0].leaseExpDate ? '' : hardware[0].leaseExpDate
    });
  }, [loading, getHardware, match.params.id]);

  const {
    name,
    serialNumber,
    manufacturer,
    model,
    category,
    status,
    location,
    assigned,
    assignedTo,
    expectedCheckInDate,
    checkOutDate,
    checkInDate,
    cost,
    supplier,
    warranty,
    leaseExpDate
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //key = name, value changes state

  const onSubmit = (e) => {
    e.preventDefault();
    editHardware(formData, match.params.id);
  };

  return (
    <Fragment>
      {hardware === null ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Keisti įrangos duomenis</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Užpildykite šią formą
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Pavadinimas'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
              <small className='form-text'>
                Pavadinimas turi būti unikalus!
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Serijinis numeris'
                name='serialNumber'
                value={serialNumber}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Gamintojas'
                name='manufacturer'
                value={manufacturer}
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
                <option value='Vaizdo įranga'>Vaizdo įranga</option>
                <option value='Planšetės'>Planšetės</option>
                <option value='Spausdintuvai'>Spausdintuvai</option>
                <option value='Serveriai'>Serveriai</option>
              </select>
            </div>

            <Fragment>
              {assigned === true ? (
                <p style={{ fontWeight: 900 }}>
                  Statuso keisti negalima, nes įranga yra priskirta!
                </p>
              ) : (
                <div className='form-group'>
                  <select
                    name='status'
                    value={status}
                    onChange={(e) => onChange(e)}
                  >
                    <option value='0'>* Parinkite statusą</option>
                    <option value='Paruoštas'>Paruoštas</option>
                    <option value='Neparuoštas'>Neparuoštas</option>
                    <option value='Remontas'>Remontas</option>
                    <option value='Išpirktas'>Išpirktas</option>
                    <option value='Archyvuotas'>Archyvuotas</option>
                    <option value='Dingęs'>Dingęs</option>
                    <option value='Kita'>Kita</option>
                  </select>
                </div>
              )}
            </Fragment>

            <div className='form-group'>
              <input
                type='text'
                placeholder='Kam priskirtas'
                name='assignedTo'
                value={assignedTo}
                disabled
              />
              <small className='form-text'>
                Naudotojas, kuriam priskirta įranga
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
                Dabartinė įrangos buvimo vieta
              </small>
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

            <Link to='/hardware' className='btn btn-light'>
              Grįžti į aparatinės įrangos sąrašą
            </Link>
            {/* FIX THIS */}
            <div className='my-2'>
              <button
                onClick={() => toggleAdditionalData(!displayAdditionalData)}
                type='button'
                className='btn btn-light'
              >
                Peržiūrėti detalesnius duomenis
              </button>
            </div>
            {displayAdditionalData && (
              <Fragment>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Tiekėjas'
                    name='supplier'
                    value={supplier}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Garantija'
                    name='warranty'
                    value={warranty}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Nuomos galiojimo pabaiga'
                    name='leaseExpDate'
                    value={leaseExpDate}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Tikėtina grąžinimo data'
                    name='expectedCheckInDate'
                    value={formatDate(expectedCheckInDate)}
                    disabled
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Priskyrimo data'
                    name='checkOutDate'
                    value={formatDate(checkOutDate)}
                    disabled
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Atsiėmimo data'
                    name='checkInDate'
                    value={formatDate(checkInDate)}
                    disabled
                  />
                </div>
              </Fragment>
            )}
            {/* <input type='submit' class='btn btn-primary my-1' /> */}
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

EditHardware.defaultProps = {
  showActions: true
};

EditHardware.propTypes = {
  getHardware: PropTypes.func.isRequired,
  editHardware: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  hardware: state.hardware
});

export default connect(mapStateToProps, { editHardware, getHardware })(
  EditHardware
);
