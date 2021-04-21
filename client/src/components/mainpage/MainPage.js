import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import MainActions from '../mainpage/MainActions';
import { getCurrentProfile } from '../../actions/profile';

const MainPage = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Loading />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Pagrindinis puslapis</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sveiki, {user && user.email}!
      </p>
      {profile !== null ? (
        <Fragment>
          <MainActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>
            Jūs nesate užpildę asmeninės informacijos, prašome tai padaryti kuo
            greičiau!
          </p>{' '}
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Susikurti profilį
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

MainPage.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(MainPage);
