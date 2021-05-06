import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkInHardware, getHardware } from '../../actions/assets/hardware';
import { getProfiles } from '../../actions/profile';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tables from '../tables/Tables';
import { Link } from 'react-router-dom';
//import formatDate from '../../utility/formatDate';
import { TableBody, TableCell, TableRow, Button } from '@material-ui/core';
import formatDate from '../../utility/formatDate';

const CheckInHardware = ({
  getProfiles,
  profile: { profile, loading },
  getHardware,
  hardware: { hardware },
  checkInHardware,
  match
}) => {
  const [formData, setFormData] = useState({
    status: '',
    checkInDate: ''
  });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getProfiles();
    getHardware(match.params.id);
  }, [loading, getHardware, getProfiles, match.params.id]);

  const { assignedTo, checkInDate, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //key = name, value changes state

  const onSubmit = (e) => {
    e.preventDefault();
    checkInHardware(formData, match.params.id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const headerCells = [
    { id: 'name', label: 'Pavadinimas' },
    { id: 'serialNumber', label: 'Serijinis Numeris', disableSorting: true },
    { id: 'model', label: 'Modelis' },
    { id: 'manufacturer', label: 'Gamintojas' },
    { id: 'category', label: 'Kategorija' },
    { id: 'status', label: 'Statusas' },
    { id: 'assignedTo', label: 'Kam priskirtas', disableSorting: true },
    //{ id: 'CheckInOut', label: 'Priskirti/Atsiimti', disableSorting: true },
    // { id: 'CheckIn', label: 'Atsiimti', disableSorting: true },
    { id: 'cost', label: 'Kaina', disableSorting: true },
    { id: 'date', label: 'Įkėlimo Data' },
    { id: 'checkOutDate', label: 'Priskyrimo data' }
  ];

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(hardware, headerCells);

  return (
    <Fragment>
      <div>
        <Button variant='contained' color='primary' onClick={handleClickOpen}>
          Atsiimti turtą iš naudotojo
        </Button>
        <div>
          <h3
            className='MuiTypography-h3-primary'
            style={{ marginTop: '15px' }}
          >
            Ar tikrai norite atsiimti turtą iš {hardware[0].assignedTo}?
          </h3>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            Atsiimti aparatinę įrangą
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Atsiimti turtą</DialogContentText>
            <Fragment>
              <form
                id='my-form-id'
                className='form'
                onSubmit={(e) => onSubmit(e)}
              >
                <div className='form-group'>
                  <input
                    required
                    name='assignedTo'
                    value={assignedTo}
                    disabled
                  ></input>
                  <small className='form-text'>
                    Naudotojas, kuriam priskiriamas turtas
                  </small>
                </div>
                <div className='form-group'>
                  <input
                    type='date'
                    selected={Date.now()}
                    name='checkInDate'
                    value={checkInDate}
                    onChange={(e) => onChange(e)}
                  />
                  <small className='form-text'>Priskyrimo data</small>
                </div>
                <div className='form-group'>
                  <select
                    name='status'
                    value={status}
                    onChange={(e) => onChange(e)}
                  >
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
                <input type='submit' onClick={handleClose} Priskirti />
              </form>
            </Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Atšaukti
            </Button>
            {/* <Button onClick={handleClose} color='primary'> */}

            {/* </Button> */}
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Fragment>
          <TableContainer>
            <TableHeader />
            <TableBody>
              <TableRow key={hardware[0]._id}>
                <TableCell>{hardware[0].name}</TableCell>
                <TableCell>{hardware[0].serialNumber}</TableCell>
                <TableCell>{hardware[0].model}</TableCell>
                <TableCell>{hardware[0].manufacturer}</TableCell>
                <TableCell>{hardware[0].category}</TableCell>
                <TableCell>{hardware[0].status}</TableCell>
                <TableCell>{hardware[0].assignedTo}</TableCell>
                <TableCell>{hardware[0].cost}</TableCell>
                <TableCell>{formatDate(hardware[0].date)}</TableCell>
                <TableCell>{formatDate(hardware[0].checkOutDate)}</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        </Fragment>
      </div>
    </Fragment>
  );
};

CheckInHardware.propTypes = {
  getHardware: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  checkInHardware: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  hardware: state.hardware,
  profile: state.profile
});

export default connect(mapStateToProps, {
  checkInHardware,
  getHardware,
  getProfiles
})(CheckInHardware);