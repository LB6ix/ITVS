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
import { formatDate } from '../../utility/formatDate';
import Loading from '../layout/Loading';

const CheckOutSoftware = ({
  getProfiles,
  profile: { profiles, loading },
  getSoftware,
  software: { software },
  checkOutSoftware,
  history,
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

  const { assignedTo, checkOutDate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //key = name, value changes state

  const onSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      checkOutSoftware(formData, match.params.id);
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

                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant='contained'
                        color='primary'
                      >
                        Atšaukti
                      </Button>
                      <Button
                        color='secondary'
                        type='submit'
                        variant='contained'
                        onClick={handleClose}
                      >
                        Priskirti
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
