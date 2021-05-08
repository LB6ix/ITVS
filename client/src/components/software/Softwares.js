import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSoftwares, deleteSoftware } from '../../actions/assets/software';
import Loading from '../layout/Loading';
import { Link, Switch } from 'react-router-dom';
import formatDate from '../../utility/formatDate';
import Tables from '../tables/Tables';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  TableBody,
  TableCell,
  TableRow,
  Button,
  makeStyles
} from '@material-ui/core';
let currentDate = new Date();
const offset = currentDate.getTimezoneOffset();
currentDate = new Date(currentDate.getTime() - offset * 60 * 1000);
currentDate.setDate(currentDate.getDate() - 1);
currentDate = currentDate.toISOString().split('T')[0];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  row: {
    background: '#ff0009'
  },
  row2: {
    background: '#ebe6f0'
  },
  row3: {
    background: '#006622'
  }
}));

const Softwares = ({
  getSoftwares,
  deleteSoftware,

  software: { softwares, loading },
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
    getSoftwares();
  }, [getSoftwares]);
  const classes = useStyles();
  const headerCells = [
    { id: 'license', label: 'Licencija' },
    { id: 'key', label: 'Raktas', disableSorting: true },
    { id: 'expDate', label: 'Galiojimo data', disableSorting: true },
    { id: 'manufacturer', label: 'Leidėjas' },
    { id: 'status', label: 'Statusas' },
    { id: 'totalAmount', label: 'Kiekis', disableSorting: true },
    { id: 'assigned', label: 'Priskirta', disableSorting: true },
    { id: 'assignedTo', label: 'Kam priskirta', disableSorting: true },
    { id: 'CheckInOout', label: 'Priskirti/Atsiimti', disableSorting: true },
    { id: 'cost', label: 'Kaina', disableSorting: true },
    { id: 'supplier', label: 'Tiekėjas', disableSorting: true },
    { id: 'date', label: 'Data', disableSorting: true },
    { id: 'Veiksmai', label: 'Veiksmai', disableSorting: true }
  ];

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(softwares, headerCells);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <h1 className='large text'>Programinės įrangos sąrašas</h1>

      <Link to={`/software/add-software`}>
        <Button size='large' variant='contained' color='primary'>
          Pridėti naują įrangą
        </Button>
      </Link>
      {/* <table className='table'> */}
      <TableContainer>
        <TableHeader />
        <TableBody>
          {recordsAfterPagingAndSorting().map((sw) => (
            <TableRow
              key={softwares._id}
              className={sw.expDate < currentDate ? classes.row : classes.row2}
              {...(sw.expDate < currentDate
                ? (sw.status = 'Negaliojanti')
                : (sw.status = sw.status))}
            >
              <TableCell>{sw.license}</TableCell>
              <TableCell>{sw.key}</TableCell>
              <TableCell>{formatDate(sw.expDate)}</TableCell>
              <TableCell>{sw.manufacturer}</TableCell>
              <TableCell
                className={
                  sw.status === 'Aktyvi'
                    ? classes.row3
                    : sw.status === 'Negaliojanti'
                    ? classes.row
                    : classes.row2
                }
              >
                {sw.status}
              </TableCell>
              <TableCell>{sw.totalAmount}</TableCell>
              <TableCell>{sw.assigned === true ? 'Taip' : 'Ne'}</TableCell>
              <TableCell>{sw.assignedTo}</TableCell>

              {sw.status === 'Negaliojanti' ? (
                <TableCell>Licencija baigė galioti!</TableCell>
              ) : (
                <Fragment>
                  {sw.assigned === false ? (
                    <TableCell>
                      <Link to={`/software/${sw._id}/checkout`}>
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
                        <Link to={`/software/${sw._id}/checkin`}>
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

              <TableCell>{sw.cost}€</TableCell>
              <TableCell>{sw.supplier}</TableCell>
              <TableCell>{formatDate(sw.date)}</TableCell>
              <TableCell>
                <Link to={`/software/single/${sw._id}`}>
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
                  color='secondary'
                  aria-label='delete'
                  onClick={() => deleteSoftware(sw._id)}
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

Softwares.propTypes = {
  isAdmin: PropTypes.bool,
  getSoftwares: PropTypes.func.isRequired,
  deleteSoftware: PropTypes.func.isRequired,
  //   getUserSoftwares: PropTypes.func.isRequired,
  software: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  software: state.software,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { getSoftwares, deleteSoftware })(
  Softwares
);
