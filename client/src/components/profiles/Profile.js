import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import { Button } from '@material-ui/core';
// import ProfileTop from './ProfileTop';
import ProfileView from './ProfileView';
// import ProfileAbout from './ProfileAbout';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Loading />
      ) : (
        <Fragment>
          <Link to={`/user-list`}>
            <Button size='large' variant='contained' color='primary'>
              Grįžti į naudotojų sąrašą
            </Button>
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to={`/edit-profile`}>
                <Button
                  size='large'
                  variant='contained'
                  color='secondary'
                  style={{ marginLeft: '10px' }}
                >
                  Keisti profilio duomenis
                </Button>
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileView profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
