import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHardwares, deleteHardware } from '../../actions/assets/hardware';
import Loading from '../layout/Loading';
import Tables from '../tables/Tables';
import { Link } from 'react-router-dom';
import formatDate from '../../utility/formatDate';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar,
  Button
} from '@material-ui/core';

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
    { id: 'CheckOut', label: 'Priskirti', disableSorting: true },
    { id: 'CheckIn', label: 'Atsiimti', disableSorting: true },
    { id: 'cost', label: 'Kaina', disableSorting: true },
    // { id: 'date', label: 'Įkėlimo data' },
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
      <Link to={`/hardware/add-hardware`} className='btn btn-primary'>
        Pridėti naują įrangą
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
              <TableCell>{hw.assignedTo}</TableCell>{' '}
              <TableCell>
                {
                  <Link to={`/hardware/${hw._id}`}>
                    <Button size='small' variant='contained' color='primary'>
                      Priskirti
                    </Button>
                  </Link>
                }
              </TableCell>
              <TableCell>
                {
                  <Link to={`/hardware/${hw._id}`}>
                    <Button size='small' variant='contained' color='primary'>
                      Atsiimti
                    </Button>
                  </Link>
                }
              </TableCell>
              {/* <TableCell>{sw.assignedTo}</TableCell> */}
              <TableCell>{hw.cost}</TableCell>
              {/* <TableCell>{formatDate(hw.date)}</TableCell> */}
              <TableCell>
                {/* <Link to={`/hardwares/${hw._id}`}>
                  <Button size='small' variant='contained' color='primary'>
                    Peržiūrėti
                  </Button>
                </Link> */}
                <Link to={`/hardware/${hw._id}`}>
                  <IconButton
                    className='tableActions'
                    style={{ display: 'inline' }}
                  >
                    <VisibilityIcon fontSize='small' />
                  </IconButton>
                </Link>
                <IconButton
                  style={{ display: 'inline' }}
                  className='tableActions'
                  aria-label='delete'
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
