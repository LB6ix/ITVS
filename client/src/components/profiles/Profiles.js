import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import profile from '../../reducers/profile';
import { Link } from 'react-router-dom';

const Profiles = ({
  getProfiles,
  profile: {
    // user: { _id },
    profiles,
    loading
  }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const profilelist = profiles.map((prf) => (
    <tr key={profiles._id}>
      <td>
        <img src={prf.user.avatar} alt='' className='round-img' />
      </td>
      <td>{prf.user.firstname}</td>
      <td>{prf.user.lastname}</td>
      <td>{prf.user.email}</td>
      <td>{prf.title}</td>
      <td>{prf.department}</td>
      <td>{prf.location}</td>
      <td>{prf.phoneNumber}</td>
      <td>
        <Link to={`/profile/${prf.user._id}`} className='btn btn-primary'>
          Profilis
        </Link>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Naudotojų sąrašas</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Testing
          </p>
          <table className='table'>
            <thead>
              <tr>
                <th>Nuotrauka</th>
                <th>Vardas</th>
                <th>Pavardė</th>
                <th>El. paštas</th>
                <th>Pareigos</th>
                <th>Skyrius</th>
                <th>Vieta</th>
                <th>Telefono Numeris</th>
                <th>Profilis</th>
              </tr>
            </thead>
            <tbody>
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
              {profilelist}
            </tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
