import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkOutHardware, getHardware } from '../../actions/assets/hardware';
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
import Loading from '../layout/Loading';

const CheckOutHardware = ({
  getProfiles,
  profile: { profiles },
  getHardware,
  hardware: { hardware, loading },
  checkOutHardware,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    checkOutDate: '',
    expectedCheckInDate: ''
  });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getProfiles();
    getHardware(match.params.id);
  }, [loading, getHardware, getProfiles, match.params.id]);

  const { assignedTo, checkOutDate, expectedCheckInDate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //key = name, value changes state

  const onSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      checkOutHardware(formData, match.params.id);
      history.push('/hardware');
    }, 1000);
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

    // { id: 'CheckIn', label: 'Atsiimti', disableSorting: true },
    { id: 'cost', label: 'Kaina', disableSorting: true },
    { id: 'date', label: 'Data' }
  ];

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(hardware, headerCells);

  return (
    <Fragment>
      {hardware === null ? (
        <Loading />
      ) : (
        <Fragment>
          <div>
            <Button
              variant='contained'
              color='primary'
              onClick={handleClickOpen}
            >
              Priskirti turtą naudotojui
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='form-dialog-title'
            >
              <DialogTitle id='form-dialog-title'>
                Priskirti aparatinę įranga
              </DialogTitle>
              <DialogContent>
                <DialogContentText>Priskirkite turtą</DialogContentText>
                <Fragment>
                  <form
                    id='my-form-id'
                    className='form'
                    onSubmit={(e) => onSubmit(e)}
                  >
                    <div className='form-group'>
                      <select
                        required
                        name='assignedTo'
                        value={assignedTo}
                        onChange={(e) => onChange(e)}
                      >
                        {profiles.map((prf) => (
                          <option key={profiles._id} value={prf.user._id}>
                            {prf.user.email}
                          </option>
                        ))}
                      </select>
                      <small className='form-text'>
                        Naudotojas, kuriam priskiriamas turtas
                      </small>
                    </div>
                    <div className='form-group'>
                      <input
                        type='date'
                        selected={Date.now()}
                        name='checkOutDate'
                        value={checkOutDate}
                        onChange={(e) => onChange(e)}
                      />
                      <small className='form-text'>Priskyrimo data</small>
                    </div>
                    <div className='form-group'>
                      <input
                        type='date'
                        placeholder=''
                        name='expectedCheckInDate'
                        value={expectedCheckInDate}
                        onChange={(e) => onChange(e)}
                      />
                      <small className='form-text'>
                        Tikėtina grąžinimo data
                      </small>
                    </div>
                    <Button
                      color='primary'
                      type='submit'
                      variant='contained'
                      onClick={handleClose}
                      color='primary'
                    >
                      Priskirti
                    </Button>
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
                    <TableCell>{hardware[0].cost}</TableCell>
                    <TableCell>{formatDate(hardware[0].date)}</TableCell>
                  </TableRow>
                </TableBody>
              </TableContainer>
            </Fragment>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

CheckOutHardware.propTypes = {
  getHardware: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  checkOutHardware: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  hardware: state.hardware,
  profile: state.profile
});

export default connect(mapStateToProps, {
  checkOutHardware,
  getHardware,
  getProfiles
})(CheckOutHardware);
