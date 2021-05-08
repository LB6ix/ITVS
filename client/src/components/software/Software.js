import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';
import { Button } from '@material-ui/core';

import SoftwareItem from '../software/SoftwareItem';
// import ProfileAbout from './ProfileAbout';
import { getSoftware } from '../../actions/assets/software';

const Software = ({ getSoftware, software: { software }, match }) => {
  useEffect(() => {
    getSoftware(match.params.id);
  }, [getSoftware, match.params.id]);

  return (
    <Fragment>
      {software === null ? (
        <Loading />
      ) : (
        <Fragment>
          <Link to={`/software`}>
            <Button size='large' variant='contained' color='primary'>
              Grįžti į sąšąra
            </Button>
          </Link>

          <Link to={`/software/edit/${match.params.id}`}>
            <Button
              size='large'
              variant='contained'
              color='secondary'
              style={{ marginLeft: '10px' }}
            >
              Keisti įrangos duomenis
            </Button>
          </Link>
          <div className='profile-grid my-1'>
            <SoftwareItem software={software} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Software.propTypes = {
  getSoftware: PropTypes.func.isRequired,
  software: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  software: state.software
});

export default connect(mapStateToProps, { getSoftware })(Software);
