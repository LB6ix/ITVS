import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import { getProfiles, deleteAccount } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Tables from '../tables/Tables';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment, TextField, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import { formatDate } from '../../utility/formatDate';

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: '33%'
  }
}));

const Profiles = ({
  getProfiles,
  deleteAccount,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const classes = useStyles();
  const [filterFunction, setFilterFunction] = useState({
    function: (items) => {
      return items;
    }
  });

  const headerCells = [
    { id: 'avatar', label: 'Nuotrauka', disableSorting: true },
    { id: 'firstname', label: 'Vardas' },
    { id: 'lastname', label: 'Pavardė' },
    { id: 'email', label: 'El.paštas' },
    { id: 'title', label: 'Pareigos' },
    { id: 'department', label: 'Skyrius' },
    { id: 'company', label: 'Įmonė' },
    { id: 'location', label: 'Vieta' },
    { id: 'phoneNumber', label: 'Telefono numeris', disableSorting: true },
    { id: 'date', label: 'Data' },
    { id: 'Veiksmai', label: 'Veiksmai' }
  ];

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(profiles, headerCells, filterFunction);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFunction({
      function: (users) => {
        if (target.value === '') return users;
        else return users.filter((x) => x.user.email.includes(target.value));
      }
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className='large text'>Naudotojų sąrašas</h1>
          <Toolbar style={{ display: 'inline', paddingLeft: '0px' }}>
            <TextField
              size='medium'
              variant='outlined'
              label='Ieškoti naudotojo pagal el. paštą'
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
              {recordsAfterPagingAndSorting().map((prf) => (
                <TableRow key={profiles._id}>
                  <TableCell>
                    <Link to={`/profile/${prf.user._id}`}>
                      <img src={prf.user.avatar} alt='' className='round-img' />
                    </Link>
                  </TableCell>

                  <TableCell>{prf.user.firstname}</TableCell>
                  <TableCell>{prf.user.lastname}</TableCell>
                  <TableCell>{prf.user.email}</TableCell>
                  <TableCell>{prf.title}</TableCell>
                  <TableCell>{prf.department}</TableCell>
                  <TableCell>{prf.company}</TableCell>
                  {/* <TableCell>{sw.assignedTo}</TableCell> */}
                  <TableCell>{prf.location}</TableCell>
                  <TableCell>{prf.phoneNumber}</TableCell>
                  <TableCell style={{ padding: '0' }}>
                    {formatDate(prf.date)}
                  </TableCell>
                  <TableCell>
                    <Link to={`/profile/${prf.user._id}`}>
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
                      variant='contained'
                      color='secondary'
                      size='medium'
                      onClick={() => deleteAccount(prf.user._id)}
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
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles, deleteAccount })(
  Profiles
);
