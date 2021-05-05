import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkOutSoftware, getSoftware } from '../../actions/assets/software';
import { getProfiles } from '../../actions/profile';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tables from '../tables/Tables';

//import formatDate from '../../utility/formatDate';

import { TableBody, TableCell, TableRow, Button } from '@material-ui/core';
import formatDate from '../../utility/formatDate';

const CheckOutSoftware = ({
  getProfiles,
  profile: { profiles, loading },
  getSoftware,
  software: { software },
  checkOutSoftware,
  match
}) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    checkOutDate: ''
  });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getProfiles();
    getSoftware(match.params.id);
  }, [loading, getSoftware, getProfiles, match.params.id]);

  const { assignedTo, checkOutDate, expectedCheckInDate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //key = name, value changes state

  const onSubmit = (e) => {
    e.preventDefault();
    checkOutSoftware(formData, match.params.id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const headerCells = [
    { id: 'license', label: 'Licencija', disableSorting: true },
    { id: 'key', label: 'Raktas', disableSorting: true },
    { id: 'expDate', label: 'Galiojimo data', disableSorting: true },
    { id: 'manufacturer', label: 'Leidėjas', disableSorting: true },
    { id: 'totalAmount', label: 'Kiekis', disableSorting: true },
    { id: 'assignedTo', label: 'Kam priskirta', disableSorting: true },
    { id: 'cost', label: 'Kaina', disableSorting: true },
    { id: 'supplier', label: 'Tiekėjas', disableSorting: true },
    { id: 'date', label: 'Data', disableSorting: true },
    { id: 'Veiksmai', label: 'Veiksmai', disableSorting: true }
  ];

  const { TableContainer, TableHeader, TablePaginationKomp } = Tables(
    software,
    headerCells
  );

  return (
    <Fragment>
      <div>
        <Button variant='contained' color='primary' onClick={handleClickOpen}>
          Priskirti programinę įrangą
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            Programinės įrangos priskyrimas
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
                    Naudotojas, kuriam priskiriama programinė įranga
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
              <TableRow key={software._id}>
                <TableCell>{software.name}</TableCell>
                <TableCell>{software.serialNumber}</TableCell>
                <TableCell>{software.model}</TableCell>
                <TableCell>{software.manufacturer}</TableCell>
                <TableCell>{software.category}</TableCell>
                <TableCell>{software.status}</TableCell>
                <TableCell>{software.assignedTo}</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        </Fragment>
      </div>
    </Fragment>
  );
};

CheckOutSoftware.propTypes = {
  getSoftware: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  checkOutSoftware: PropTypes.func.isRequired,
  software: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  software: state.software,
  profile: state.profile
});

export default connect(mapStateToProps, {
  checkOutSoftware,
  getSoftware,
  getProfiles
})(CheckOutSoftware);
