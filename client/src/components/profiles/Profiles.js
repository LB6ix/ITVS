import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import ProfileItem from './ProfileItem';
import { getProfiles, deleteAccount } from '../../actions/profile';
import profile from '../../reducers/profile';
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

const Profiles = ({
  getProfiles,
  deleteAccount,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const headerCells = [
    { id: 'avatar', label: 'Nuotrauka', disableSorting: true },
    { id: 'firstname', label: 'Vardas' },
    { id: 'lastname', label: 'Pavardė' },
    { id: 'email', label: 'El.paštas' },
    { id: 'title', label: 'Pareigos' },
    { id: 'department', label: 'Skyrius' },
    { id: 'location', label: 'Vieta' },
    { id: 'phoneNumber', label: 'Telefono numeris', disableSorting: true },
    { id: 'actions', label: 'Veiksmai', disableSorting: true }
  ];

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(profiles, headerCells);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Naudotojų sąrašas</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Testing
          </p>
          {/* <tr>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <tr>
                    {' '}
                    key={profile._id}
                    <td>profile={profile.phoneNumber}</td>
                  </tr>
                ))
              ) : (
                <h4>Nėraprof</h4>
              )}
            </tr> */}
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
                  {/* <TableCell>{sw.assignedTo}</TableCell> */}
                  <TableCell>{prf.location}</TableCell>
                  <TableCell>{prf.phoneNumber}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => deleteAccount(prf.user._id)}
                      type='button'
                      className='btn btn-danger'
                    >
                      <i className='fas fa-times' />
                    </button>
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
