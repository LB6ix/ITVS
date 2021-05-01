import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHardwares } from '../../actions/assets/hardware';
import Loading from '../layout/Loading';
import Tables from '../tables/Tables';
import { Link } from 'react-router-dom';
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

const Hardwares = ({
  getHardwares,
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
    { id: 'category', label: 'Kategorija' },
    { id: 'status', label: 'Statusas' },
    { id: 'cost', label: 'Kaina', disableSorting: true },
    { id: 'date', label: 'Data' }
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
      <h2 className='my-2'>Aparatinės įrangos sąrašas</h2>
      <Link to={`/hardwares/add-hardware`} className='btn btn-primary'>
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
              <TableCell>{hw.category}</TableCell>
              <TableCell>{hw.status}</TableCell>
              {/* <TableCell>{sw.assignedTo}</TableCell> */}
              <TableCell>{hw.cost}</TableCell>
              <TableCell>{hw.date}</TableCell>
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
  //   getUserHardwares: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  hardware: state.hardware,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { getHardwares })(Hardwares);
