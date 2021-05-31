import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLogs, exportLogs } from '../../actions/log';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import Tables from '../tables/Tables';
import { Search } from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import {
  TableBody,
  TableCell,
  TableRow,
  Button,
  InputAdornment,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: '33%'
  }
}));
const Logs = ({ getLogs, exportLogs, log: { logs, loading } }) => {
  useEffect(() => {
    getLogs();
  }, [getLogs]);

  const classes = useStyles();
  const [filterFunction, setFilterFunction] = useState({
    function: (items) => {
      return items;
    }
  });

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
  } = Tables(logs, headerCells, filterFunction);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFunction({
      function: (assets) => {
        if (target.value === '') return assets;
        else return assets.filter((x) => x.message.includes(target.value));
      }
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <h1 className='large text'>Įvykių žurnalo sąrašas</h1>
      <Link to={`/main`}>
        <Button
          size='large'
          variant='contained'
          color='primary'
          style={{ marginLeft: '0px', marginTop: '8px' }}
        >
          Grįžti į pagrindinį puslapį
        </Button>
      </Link>

      <Button
        style={{ marginLeft: '10px', marginTop: '8px' }}
        variant='contained'
        color='secondary'
        size='large'
        startIcon={<FolderIcon />}
        onClick={() => exportLogs()}
      >
        Eksportuoti
      </Button>
      <Toolbar style={{ display: 'inline', paddingLeft: '10px' }}>
        <TextField
          size='medium'
          variant='outlined'
          label='Ieškoti įvykio pagal aprašymą'
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
