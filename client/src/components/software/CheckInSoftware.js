import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkInSoftware, getSoftware } from '../../actions/assets/software';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tables from '../tables/Tables';

import { TableBody, TableCell, TableRow, Button } from '@material-ui/core';
import formatDate from '../../utility/formatDate';
import Loading from '../layout/Loading';

const CheckInSoftware = ({
  getSoftware,
  software: { software, loading },
  checkInSoftware,
  match,
  history
}) => {
  const [formData, setFormData] = useState({
    status: '',
    checkInDate: ''
  });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getSoftware(match.params.id);
  }, [loading, getSoftware, match.params.id]);

  const { checkInDate, status } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //key = name, value changes state

  const onSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      checkInSoftware(formData, match.params.id);
    }, 1000);
    setTimeout(() => {
      history.push('/software');
    }, 1000);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const headerCells = [
    { id: 'license', label: 'Licencija' },
    { id: 'key', label: 'Raktas', disableSorting: true },
    { id: 'expDate', label: 'Galiojimo data', disableSorting: true },
    { id: 'manufacturer', label: 'Leidėjas' },
    { id: 'status', label: 'Statusas' },
    { id: 'assignedTo', label: 'Kam priskirta', disableSorting: true },
    { id: 'totalAmount', label: 'Kiekis', disableSorting: true },
    { id: 'cost', label: 'Kaina', disableSorting: true },
    { id: 'supplier', label: 'Tiekėjas', disableSorting: true },
    { id: 'date', label: 'Data', disableSorting: true }
  ];
  const { TableContainer, TableHeader } = Tables(software, headerCells);

  return (
    <Fragment>
      {software === null ? (
        <Loading />
      ) : (
        <Fragment>
          <div>
            <Button
              variant='contained'
              color='primary'
              onClick={handleClickOpen}
            >
              Atsiimti programą iš naudotojo
            </Button>
            <div>
              <h3
                className='MuiTypography-h3-primary'
                style={{ marginTop: '15px' }}
              >
                {/* Ar tikrai norite atsiimti turtą iš {hardware[0].assignedTo}? */}
              </h3>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='form-dialog-title'
            >
              <DialogTitle id='form-dialog-title'>
                Atsiimti programinę įrangą
              </DialogTitle>
              <DialogContent>
                <DialogContentText>Atsiimti turtą</DialogContentText>
                <Fragment>
                  <form
                    id='my-form-id'
                    className='form'
                    onSubmit={(e) => onSubmit(e)}
                  >
                    {/* <div className='form-group'>
                  <input
                    required
                    name='assignedTo'
                    value={assignedTo}
                    disabled
                  ></input>
                  <small className='form-text'>
                    Naudotojas, kuriam priskiriamas turtas
                  </small>
                </div> */}
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
                        <option value='Neaktyvi'>Neaktyvi</option>
                        <option value='Aktyvi'>Aktyvi</option>
                        <option value='Negaliojanti'>Negaliojanti</option>
                        <option value='Kita'>Kita</option>
                      </select>
                    </div>
                    <DialogActions>
                      <Button
                        color='secondary'
                        variant='contained'
                        onClick={handleClose}
                      >
                        Atšaukti
                      </Button>
                      {/* <Button onClick={handleClose} color='primary'> */}

                      {/* </Button> */}

                      <Button
                        color='primary'
                        type='submit'
                        variant='contained'
                        onClick={handleClose}
                      >
                        Atsiimti
                      </Button>
                    </DialogActions>
                  </form>
                </Fragment>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Fragment>
              <TableContainer>
                <TableHeader />
                <TableBody>
                  <TableRow key={software[0]._id}>
                    <TableCell>{software[0].license}</TableCell>
                    <TableCell>{software[0].key}</TableCell>
                    <TableCell>{formatDate(software[0].expDate)}</TableCell>
                    <TableCell>{software[0].manufacturer}</TableCell>
                    <TableCell>{software[0].status}</TableCell>
                    <TableCell>{software[0].assignedTo}</TableCell>
                    <TableCell>{software[0].totalAmount}</TableCell>
                    <TableCell>{software[0].cost}</TableCell>
                    <TableCell>{software[0].supplier}</TableCell>
                    <TableCell>{formatDate(software[0].date)}</TableCell>
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
CheckInSoftware.propTypes = {
  getSoftware: PropTypes.func.isRequired,
  checkInSoftware: PropTypes.func.isRequired,
  software: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  software: state.software
});

export default connect(mapStateToProps, {
  checkInSoftware,
  getSoftware
})(CheckInSoftware);
