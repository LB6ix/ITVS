import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getHardwares,
  deleteHardware,
  getUserHardwares
} from '../../actions/assets/hardware';
import Loading from '../layout/Loading';
import Tables from '../tables/Tables';
import { Link } from 'react-router-dom';
//import formatDate from '../../utility/formatDate';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorIcon from '@material-ui/icons/Error';
import {
  TableBody,
  TableCell,
  TableRow,
  Button,
  makeStyles
} from '@material-ui/core';
import formatDate from '../../utility/formatDate';
import CheckOutHardware from './CheckOutHardware';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  row: {
    background: '#ffa726'
  },
  row2: {
    background: '#ebe6f0'
  }
}));

const Hardwares = ({
  getHardwares,
  deleteHardware,
  getUserHardwares,
  user,
  hardware: { hardwares, loading },
  isAuthenticated,
  isAdmin,
  showActions
}) => {
  useEffect(() => {
    isAdmin && getHardwares();
    !loading && isAuthenticated && !isAdmin && getUserHardwares();
  }, [getHardwares, getUserHardwares]);

  const classes = useStyles();

  let headerCells = [];
  {
    !loading && isAuthenticated && isAdmin
      ? (headerCells = [
          { id: 'name', label: 'Pavadinimas' },
          {
            id: 'serialNumber',
            label: 'Serijinis Numeris',
            disableSorting: true
          },
          { id: 'model', label: 'Modelis' },
          { id: 'manufacturer', label: 'Gamintojas' },
          { id: 'category', label: 'Kategorija' },
          { id: 'status', label: 'Statusas' },
          { id: 'assignedTo', label: 'Kam priskirtas', disableSorting: true },
          {
            id: 'CheckInOut',
            label: 'Priskirti/Atsiimti',
            disableSorting: true
          },
          // { id: 'CheckIn', label: 'Atsiimti', disableSorting: true },
          { id: 'cost', label: 'Kaina', disableSorting: true },
          { id: 'date', label: 'Data' },
          { id: 'Veiksmai', label: 'Veiksmai' }
        ])
      : (headerCells = [
          { id: 'name', label: 'Pavadinimas' },
          {
            id: 'serialNumber',
            label: 'Serijinis Numeris',
            disableSorting: true
          },
          { id: 'model', label: 'Modelis' },
          { id: 'manufacturer', label: 'Gamintojas' },
          { id: 'category', label: 'Kategorija' },
          { id: 'date', label: 'Priskyrimo Data' }
        ]);
  }

  //  headerCells = [
  //   { id: 'name', label: 'Pavadinimas' },
  //   { id: 'serialNumber', label: 'Serijinis Numeris', disableSorting: true },
  //   { id: 'model', label: 'Modelis' },
  //   { id: 'manufacturer', label: 'Gamintojas' },
  //   { id: 'category', label: 'Kategorija' },
  //   { id: 'status', label: 'Statusas' },
  //   { id: 'assignedTo', label: 'Kam priskirtas', disableSorting: true },
  //   { id: 'CheckInOut', label: 'Priskirti/Atsiimti', disableSorting: true },
  //   // { id: 'CheckIn', label: 'Atsiimti', disableSorting: true },
  //   { id: 'cost', label: 'Kaina', disableSorting: true },
  //   { id: 'date', label: 'Data' },
  //   { id: 'Veiksmai', label: 'Veiksmai' }
  // ];

  //const TableContainer = (props) => <Table>{props.children}</Table>;

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(hardwares, headerCells);

  return (
    <Fragment>
      {hardwares === [] ? (
        <Loading />
      ) : (
        <Fragment>
          <h3 className='MuiTypography-h3'>Aparatinės įrangos sąrašas</h3>

          {showActions && (
            <Fragment>
              {!loading && isAuthenticated && isAdmin && (
                <div>
                  <Link to={`/hardware/add-hardware`}>
                    <Button size='large' variant='contained' color='primary'>
                      Pridėti naują įrangą
                    </Button>
                  </Link>
                  <TableContainer>
                    <TableHeader />
                    <TableBody>
                      {recordsAfterPagingAndSorting().map((hw) => (
                        <TableRow
                          key={hardwares._id}
                          className={
                            hw.status === 'Remontas'
                              ? classes.row
                              : classes.row2
                          }
                        >
                          <TableCell>{hw.name}</TableCell>
                          <TableCell>{hw.serialNumber}</TableCell>
                          <TableCell>{hw.model}</TableCell>
                          <TableCell>{hw.manufacturer}</TableCell>
                          <TableCell>{hw.category}</TableCell>
                          <TableCell>{hw.status}</TableCell>
                          <TableCell>{hw.assignedTo}</TableCell>

                          <Fragment>
                            {hw.status === 'Remontas' ? (
                              <TableCell>Reikia pakeisti statusą!</TableCell>
                            ) : (
                              <Fragment>
                                {hw.assigned === false ? (
                                  <TableCell>
                                    <Link to={`/hardware/${hw._id}/checkout`}>
                                      <Button
                                        size='small'
                                        variant='contained'
                                        color='primary'
                                      >
                                        Priskirti
                                      </Button>
                                    </Link>
                                  </TableCell>
                                ) : (
                                  <Fragment>
                                    <TableCell>
                                      <Link to={`/hardware/${hw._id}/checkin`}>
                                        <Button
                                          size='small'
                                          variant='contained'
                                          color='secondary'
                                        >
                                          Atsiimti
                                        </Button>
                                      </Link>
                                    </TableCell>
                                  </Fragment>
                                )}
                              </Fragment>
                            )}
                            <TableCell>{hw.cost}€</TableCell>
                            <Fragment>
                              {hw.assigned === false ? (
                                <TableCell>
                                  Įkėlimo: {formatDate(hw.date)}
                                </TableCell>
                              ) : (
                                <Fragment>
                                  <TableCell>
                                    Grąžinimo:{' '}
                                    {formatDate(hw.expectedCheckInDate)}
                                  </TableCell>
                                </Fragment>
                              )}
                            </Fragment>
                          </Fragment>
                          <TableCell>
                            <Link to={`/hardware/single/${hw._id}`}>
                              <IconButton
                                className='tableActions'
                                color='primary'
                                style={{ display: 'inline' }}
                              >
                                <VisibilityIcon fontSize='small' />
                              </IconButton>
                            </Link>
                            <IconButton
                              style={{ display: 'inline' }}
                              className='tableActions'
                              aria-label='delete'
                              color='secondary'
                              onClick={() => deleteHardware(hw._id)}
                            >
                              <DeleteIcon fontSize='small' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableContainer>
                  <TablePaginationKomp />
                </div>
              )}
              {!loading && isAuthenticated && !isAdmin && (
                <Fragment>
                  <TableContainer>
                    <TableHeader />
                    <TableBody>
                      {recordsAfterPagingAndSorting().map((hw) => (
                        <TableRow key={hardwares._id}>
                          <TableCell>{hw.name}</TableCell>
                          <TableCell>{hw.serialNumber}</TableCell>
                          <TableCell>{hw.model}</TableCell>
                          <TableCell>{hw.manufacturer}</TableCell>
                          <TableCell>{hw.category}</TableCell>
                          <TableCell>{formatDate(hw.date)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableContainer>
                  <TablePaginationKomp />
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Hardwares.defaultProps = {
  showActions: true
};

Hardwares.propTypes = {
  isAdmin: PropTypes.bool,
  getHardwares: PropTypes.func.isRequired,
  deleteHardware: PropTypes.func.isRequired,
  getUserHardwares: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired,
  showActions: PropTypes.bool
  // user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  hardware: state.hardware,
  // user: state.user,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, {
  getHardwares,
  getUserHardwares,
  deleteHardware
})(Hardwares);
