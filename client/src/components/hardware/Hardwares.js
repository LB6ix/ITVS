import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHardwares, deleteHardware } from '../../actions/assets/hardware';
import Loading from '../layout/Loading';
import Tables from '../tables/Tables';
import { Link } from 'react-router-dom';
//import formatDate from '../../utility/formatDate';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableBody, TableCell, TableRow, Button } from '@material-ui/core';
import formatDate from '../../utility/formatDate';
import CheckOutHardware from './CheckOutHardware';
const Hardwares = ({
  getHardwares,
  deleteHardware,
  user,
  hardware: { hardwares, loading },
  isAuthenticated,
  isAdmin
}) => {
  useEffect(() => {
    // {
    //   !loading && isAdmin && getHardwares();
    // }
    // {
    //   !loading && isAuthenticated && !isAdmin && getUserHardwares();
    // }
    getHardwares();
  }, [getHardwares]);

  const headerCells = [
    { id: 'name', label: 'Pavadinimas' },
    { id: 'serialNumber', label: 'Serijinis Numeris', disableSorting: true },
    { id: 'model', label: 'Modelis' },
    { id: 'manufacturer', label: 'Gamintojas' },
    { id: 'category', label: 'Kategorija' },
    { id: 'status', label: 'Statusas' },
    { id: 'assignedTo', label: 'Kam priskirtas', disableSorting: true },
    { id: 'CheckInOut', label: 'Priskirti/Atsiimti', disableSorting: true },
    // { id: 'CheckIn', label: 'Atsiimti', disableSorting: true },
    { id: 'cost', label: 'Kaina', disableSorting: true },
    { id: 'date', label: 'Data' },
    { id: 'Veiksmai', label: 'Veiksmai' }
  ];

  //const TableContainer = (props) => <Table>{props.children}</Table>;

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(hardwares, headerCells);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <h3 className='MuiTypography-h3'>Aparatinės įrangos sąrašas</h3>

      <Link to={`/hardware/add-hardware`}>
        <Button size='large' variant='contained' color='primary'>
          Pridėti naują įrangą
        </Button>
      </Link>

      {/* <Toolbar>DO SEARCH</Toolbar> */}
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
              <TableCell>{hw.status}</TableCell>
              <TableCell>{hw.assignedTo}</TableCell>
              <Fragment>
                {hw.assigned === false ? (
                  <TableCell>
                    <Link to={`/hardware/${hw._id}/checkout`} setOpen={true}>
                      <Button
                        size='small'
                        variant='contained'
                        color='primary'
                        form='my-form-id'
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
              <TableCell>{hw.cost}€</TableCell>
              <Fragment>
                {hw.assigned === false ? (
                  <TableCell>Įkėlimo: {formatDate(hw.date)}</TableCell>
                ) : (
                  <Fragment>
                    <TableCell>
                      Grąžinimo: {formatDate(hw.expectedCheckInDate)}
                    </TableCell>
                  </Fragment>
                )}
              </Fragment>

              <TableCell>
                <Link to={`/hardware/${hw._id}`}>
                  <IconButton
                    className='tableActions'
                    color='primary'
                    style={{ display: 'inline-block' }}
                  >
                    <VisibilityIcon fontSize='small' />
                  </IconButton>
                </Link>
                <IconButton
                  style={{ display: 'inline-block' }}
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
    </Fragment>
  );
};

Hardwares.propTypes = {
  isAdmin: PropTypes.bool,
  getHardwares: PropTypes.func.isRequired,
  deleteHardware: PropTypes.func.isRequired,
  //   getUserHardwares: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired
  // user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  hardware: state.hardware,
  // user: state.user,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { getHardwares, deleteHardware })(
  Hardwares
);
