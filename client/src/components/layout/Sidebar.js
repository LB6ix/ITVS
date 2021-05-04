// import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { logout } from '../../actions/auth';

// const Sidebar = ({ auth: { isAuthenticated, loading } }) => {
//   const authLinks = (
//     <ul>
//       <li>
//         <a onClick={logout} href='#!'>
//           Logout
//         </a>
//       </li>
//     </ul>
//   );

//   const nonAuthLinks = (
//     <ul>
//       <li>
//         <Link to='/user-login'>Darbuotojo prisijungimas</Link>
//       </li>
//     </ul>
//   );

//   return (
//     <nav className='sidebar-nav'>
//       <h1>
//         <Link to='/'>
//           <i className='fas fa-code'></i>ITVS
//         </Link>
//       </h1>
//       {!loading && (
//         <Fragment>{isAuthenticated ? authLinks : nonAuthLinks}</Fragment>
//       )}
//     </nav>
//   );
// };

// Sidebar.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(Sidebar);

import { makeStyles, withStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '320px',
    height: '100%',
    backgroundColor: '#17a2b8'
  }
});

export default function Sidebar() {
  const classes = useStyles();
  return <div className={classes.sidebar}>ah</div>;
}
