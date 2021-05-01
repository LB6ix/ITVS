import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSoftwares } from '../../actions/assets/software';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';

const Softwares = ({
  getSoftwares,
  software: { softwares, loading },
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
    getSoftwares();
  }, [getSoftwares]);

  const softwarelist = softwares.map((sw) => (
    <tr key={softwares._id}>
      <td>{sw.name}</td>
      <td>{sw.serialNumber}</td>
      <td>{sw.model}</td>
      <td>{sw.category}</td>
      <td>{sw.status}</td>
      <td>{sw.cost}</td>
      <td>{sw.date}</td>
    </tr>
  ));

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
      <h2 className='my-2'>Programinės įrangos sąrašas</h2>
      <Link to={`/softwares/add-software`} className='btn btn-primary'>
        Pridėti naują įrangą
      </Link>
      <table className='table'>
        <thead>
          <tr>
            <th>Pavadinimas</th>
            <th>Serijinis Numeris</th>
            <th>Modelis</th>
            <th>Kategorija</th>
            <th>Statusas</th>
            <th>Kaina</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>{softwarelist}</tbody>
      </table>
    </Fragment>
  );
};

Softwares.propTypes = {
  isAdmin: PropTypes.bool,
  getSoftwares: PropTypes.func.isRequired,
  //   getUserHardwares: PropTypes.func.isRequired,
  software: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  software: state.software,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { getSoftwares })(Softwares);
