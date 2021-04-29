import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHardwares } from '../../actions/assets/hardware';
import Loading from '../layout/Loading';

const Hardwares = ({
  getHardwares,
  hardware: { hardwares, loading },
  isAuthenticated,
  isAdmin
}) => {
  useEffect(() => {
    // {
    //   !loading && isAdmin && getHardwares();
    // }
    // {
    //   !loading && isAuthenticated && !isAdmin && getUserHardwares();
    // }
    getHardwares();
  }, [getHardwares]);
  const hardwarelist = hardwares.map((hw) => {
    <tr key={hw._id}>
      <td>{hw.name}</td>
      <td>{hw.model}</td>
      <td>{hw.category}</td>
    </tr>;
  });

  // const hardwarelist = hardwares.map((hw) => (
  //   <td key={hw._id}>
  //     <td>{hw.name}</td>
  //     <td>{hw.model}</td>
  //     <td>{hw.category}</td>
  //   </td>
  // ));
  // return loading ? (
  //   <Loading />
  // ) :
  return (
    <Fragment>
      <h2 className='my-2'>Aparatinės įrangos sąrašas</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Pavadinimas</th>
            <th>Modelis</th>
            <th>Kategorija</th>
            <th />
          </tr>
        </thead>
        <tbody>{hardwarelist}</tbody>
      </table>
    </Fragment>
  );
};

Hardwares.propTypes = {
  isAdmin: PropTypes.bool,
  getHardwares: PropTypes.func.isRequired,
  //   getUserHardwares: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired,
  hardwares: PropTypes.array.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  hardwares: state.hardware.hardwares,
  hardware: state.hardware,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { getHardwares })(Hardwares);
