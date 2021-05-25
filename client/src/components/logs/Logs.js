import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLogs, exportLogs } from '../../actions/log';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import Tables from '../tables/Tables';
import { TableBody, TableCell, TableRow, Button } from '@material-ui/core';
const Logs = ({ getLogs, exportLogs, log: { logs, loading } }) => {
  useEffect(() => {
    getLogs();
  }, [getLogs]);

  const headerCells = [
    { id: 'timestamp', label: 'Įvykio laikas' },
    { id: 'level', label: 'Įvykis' },
    { id: 'message', label: 'Įvykio aprašymas', disableSorting: true }
  ];

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(logs, headerCells);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <h1 className='large text'>Įvykių žurnalo sąrašas</h1>

      <Link to={`/main`}>
        <Button size='large' variant='contained' color='primary'>
          Grįžti į pagrindinį puslapį
        </Button>
      </Link>

      <Button
        style={{ marginLeft: '10px' }}
        variant='contained'
        color='secondary'
        size='large'
        startIcon={<FolderIcon />}
        onClick={() => exportLogs()}
      >
        Eksportuoti
      </Button>
      {/* <table className='table'> */}
      <TableContainer>
        <TableHeader />
        <TableBody>
          {recordsAfterPagingAndSorting().map((lg) => (
            <TableRow key={logs._id}>
              <TableCell>{lg.timestamp}</TableCell>
              <TableCell>{lg.level}</TableCell>
              <TableCell>{lg.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
      <TablePaginationKomp />
    </Fragment>
  );
};

Logs.propTypes = {
  getLogs: PropTypes.func.isRequired,
  exportLogs: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  log: state.log
});

export default connect(mapStateToProps, { getLogs, exportLogs })(Logs);
