import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editSoftware, getSoftware } from '../../actions/assets/software';
//import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import formatDate from '../../utility/formatDate';

const EditSoftware = ({
  software: { software, loading },
  getSoftware,
  editSoftware,
  match
}) => {
  const [formData, setFormData] = useState({
    license: '',
    key: '',
    expDate: '',
    manufacturer: '',
    totalAmount: '',
    //   availAmount: '',
    assignedTo: '',
    cost: '',
    supplier: ''
  });
  const [displayAdditionalData, toggleAdditionalData] = useState(false);

  useEffect(() => {
    getSoftware(match.params.id);
    setFormData({
      license: loading || !software.license ? '' : software.license,
      key: loading || !software.key ? '' : software.key,
      expDate: loading || !software.expDate ? '' : software.expDate,
      manufacturer:
        loading || !software.manufacturer ? '' : software.manufacturer,
      totalAmount: loading || !software.totalAmount ? '' : software.totalAmount,
      assignedTo: loading || !software.assignedTo ? '' : software.assignedTo,
      cost: loading || !software.cost ? '' : software.cost,
      supplier: loading || !software.supplier ? '' : software.supplier
    });
  }, [loading, getSoftware, match.params.id]);

  const {
    license,
    key,
    expDate,
    manufacturer,
    totalAmount,
    //   availAmount,
    assignedTo,
    cost,
    supplier
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //key = name, value changes state

  const onSubmit = (e) => {
    e.preventDefault();
    editSoftware(formData, match.params.id);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>
        Keisti programinės įrangos duomenis
      </h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Užpildykite šią formą
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Pavadinimas'
            name='license'
            value={license}
            onChange={(e) => onChange(e)}
          />
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
        <div className='form-group'>
          <input
            type='date'
            placeholder='Licencijos galiojimo data'
            name='expDate'
            value={expDate}
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
            type='number'
            placeholder='Turimų licencijų kiekis'
            name='totalAmount'
            value={totalAmount}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Vieta'
            name='assignedTo'
            value={assignedTo}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Naudotojas, kuriam priskirta įranga
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

        <Link to='/software' className='btn btn-light'>
          Grįžti į programinės įrangos sąrašą
        </Link>
        {/* FIX THIS */}
      </form>
    </Fragment>
  );
};

EditSoftware.propTypes = {
  getSoftware: PropTypes.func.isRequired,
  editSoftware: PropTypes.func.isRequired,
  software: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  software: state.software
});

export default connect(mapStateToProps, { editSoftware, getSoftware })(
  EditSoftware
);
