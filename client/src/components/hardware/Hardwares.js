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
import { Search } from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import {
  TableBody,
  TableCell,
  TableRow,
  Button,
  makeStyles,
  InputAdornment,
  TextField
} from '@material-ui/core';
import { formatDate } from '../../utility/formatDate';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  row: {
    background: '#ffa726'
  },
  row2: {
    background: '#ebe6f0'
  },
  searchInput: {
    width: '33%'
  }
}));

const Hardwares = ({
  getHardwares,
  deleteHardware,
  getUserHardwares,

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
  const [filterFunction, setFilterFunction] = useState({
    function: (items) => {
      return items;
    }
  });

  let headerCells = [];

  !loading && isAuthenticated && isAdmin
    ? (headerCells = [
        { id: 'name', label: 'Pavadinimas' },
        {
          id: 'serialNumber',
          label: 'Serijinis Numeris',
          disableSorting: true
        },
        { id: 'manufacturer', label: 'Gamintojas' },
        { id: 'model', label: 'Modelis' },
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
        { id: 'manufacturer', label: 'Gamintojas' },
        { id: 'model', label: 'Modelis' },
        { id: 'category', label: 'Kategorija' },
        { id: 'date', label: 'Priskyrimo Data' }
      ]);

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(hardwares, headerCells, filterFunction);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFunction({
      function: (assets) => {
        if (target.value === '') return assets;
        else return assets.filter((x) => x.name.includes(target.value));
      }
    });
  };

  return (
    <Fragment>
      {hardwares.length === 0 ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className='large text'>Aparatinės įrangos sąrašas</h1>

          {showActions && (
            <Fragment>
              {!loading && isAuthenticated && isAdmin && (
                <div>
                  <Link to={`/hardware/add-hardware`}>
                    <Button
                      size='large'
                      variant='contained'
                      color='primary'
                      style={{ marginTop: '8px' }}
                    >
                      Pridėti naują įrangą
                    </Button>
                  </Link>
                  <Toolbar style={{ display: 'inline', paddingLeft: '10px' }}>
                    <TextField
                      size='medium'
                      variant='outlined'
                      label='Ieškoti įrangos'
                      className={classes.searchInput}
                      name='searchHw'
                      inputProps={{
                        start: (
                          <InputAdornment position='start'>
                            <Search />
                          </InputAdornment>
                        )
                      }}
                      onChange={handleSearch}
                    ></TextField>
                  </Toolbar>
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
                          <TableCell>{hw.manufacturer}</TableCell>
                          <TableCell>{hw.model}</TableCell>
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
                                variant='contained'
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
                          <TableCell style={{ minWidth: '20px' }}>
                            {formatDate(hw.date)}
                          </TableCell>
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
