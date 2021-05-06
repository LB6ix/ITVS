import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSoftwares, deleteSoftware } from '../../actions/assets/software';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import formatDate from '../../utility/formatDate';
import Tables from '../tables/Tables';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableBody, TableCell, TableRow, Button } from '@material-ui/core';
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
      <h3 className='MuiTypography-h3'>Programinės įrangos sąrašas</h3>

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
            <TableRow key={softwares._id}>
              <TableCell>{sw.license}</TableCell>
              <TableCell>{sw.key}</TableCell>
              <TableCell>{formatDate(sw.expDate)}</TableCell>
              <TableCell>{sw.manufacturer}</TableCell>
              <TableCell>{sw.totalAmount}</TableCell>
              <TableCell>{sw.assignedTo}</TableCell>
              <TableCell>{sw.cost}</TableCell>
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
