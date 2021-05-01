import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSoftwares } from '../../actions/assets/software';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import Tables from '../tables/Tables';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar
} from '@material-ui/core';

const Softwares = ({
  getSoftwares,
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
    { id: 'license', label: 'Licencija' },
    { id: 'key', label: 'Raktas', disableSorting: true },
    { id: 'expDate', label: 'Galiojimo data' },
    { id: 'manufacturer', label: 'Leidėjas' },
    { id: 'totalAmount', label: 'Kiekis', disableSorting: true },
    { id: 'cost', label: 'Kaina', disableSorting: true },
    { id: 'date', label: 'Data' }
  ];

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(softwares, headerCells);
  // const hardwarelist = hardwares.map((hw) => (
  //   <td key={hw._id}>
  //     <td>{hw.name}</td>
  //     <td>{hw.model}</td>
  //     <td>{hw.category}</td>
  //   </td>
  // ));
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <h2 className='my-2'>Programinės įrangos sąrašas</h2>
      <Link to={`/softwares/add-software`} className='btn btn-primary'>
        Pridėti naują įrangą
      </Link>
      {/* <table className='table'> */}
      <TableContainer>
        <TableHeader />
        <TableBody>
          {recordsAfterPagingAndSorting().map((sw) => (
            <TableRow key={softwares._id}>
              <TableCell>{sw.license}</TableCell>
              <TableCell>{sw.key}</TableCell>
              <TableCell>{sw.expDate}</TableCell>
              <TableCell>{sw.manufacturer}</TableCell>
              <TableCell>{sw.totalAmount}</TableCell>
              {/* <TableCell>{sw.assignedTo}</TableCell> */}
              <TableCell>{sw.cost}</TableCell>
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
  //   getUserHardwares: PropTypes.func.isRequired,
  software: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  software: state.software,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { getSoftwares })(Softwares);
