import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../layout/Loading';

import HardwareItem from '../hardware/HardwareItem';
// import ProfileAbout from './ProfileAbout';
import { getHardware } from '../../actions/assets/hardware';

const Hardware = ({ getHardware, hardware: { hardware }, match }) => {
  useEffect(() => {
    getHardware(match.params.id);
  }, [getHardware, match.params.id]);

  return (
    <Fragment>
      {hardware === null ? (
        <Loading />
      ) : (
        <Fragment>
          <Link to='/hardware' className='btn btn-light'>
            Grįžti į aparatinės įrangos sąrašą
          </Link>
          <Link
            to={`/hardware/edit/${match.params.id}`}
            className='btn btn-dark'
          >
            Keisti duomenis
          </Link>
          <div className='profile-grid my-1'>
            <HardwareItem hardware={hardware} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Hardware.propTypes = {
  getHardware: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  hardware: state.hardware
});

export default connect(mapStateToProps, { getHardware })(Hardware);
