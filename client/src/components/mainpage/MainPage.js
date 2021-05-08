import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import MainActions from '../mainpage/MainActions';
import { getCurrentProfile } from '../../actions/profile';
import { Button } from '@material-ui/core';

const MainPage = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return profile === null ? (
    <Loading />
  ) : (
    <Fragment>
      <h1 className='large text'>Pagrindinis puslapis</h1>
      <div style={{ marginBottom: '20px' }}>
        <h3 className='medium text-dark'> Sveiki, {user && user.email}!</h3>
      </div>

      {!loading && profile !== null ? (
        <Fragment>
          <MainActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>
            Jūs nesate užpildę asmeninės informacijos, prašome tai padaryti kuo
            greičiau!
          </p>{' '}
          <Link to={`/create-profile`}>
            <Button size='large' variant='contained' color='primary'>
              Susikurti profilį
            </Button>
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
