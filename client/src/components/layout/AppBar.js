import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  inputRoot: {
    color: 'inherit'
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
}));

const PrimaryAppBar = ({
  auth: { isAuthenticated, isAdmin, loading, showPageContent },
  logout
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const adminLinks = (
    <ul>
      <li>
        <Link to='/create-user'>Sukurti naudotoją</Link>
      </li>
      <li>
        <Link to='/main'>
          <i className='fas fa-user'> </i>
          <span className='hide-sm'> </span>
          Pagrindinis puslapis
        </Link>
      </li>
      <li>
        <Link to='/user-list'>
          <i className='fas fa-user'> </i>
          <span className='hide-sm'> </span>
          Naudotojų sąrašas
        </Link>
      </li>
      <li>
        <Link to='/posts'>Prašymai</Link>
      </li>
      <li>
        <Link to='/hardware'>Aparatinė Įranga</Link>
      </li>
      <li>
        <Link to='/software'>Programinė Įranga</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'> </i>
          <span className='hide-sm'> </span>
          Atsijungti
        </a>
      </li>
    </ul>
  );

  const authLinks = (
    <div className={classes.sectionDesktop}>
      <Link to={`/posts`}>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
      </Link>
      <Link to='/'>
        <IconButton
          edge='end'
          aria-label='main page'
          aria-haspopup='true'
          color='inherit'
        >
          <HomeIcon />
        </IconButton>
      </Link>
      <IconButton
        onClick={logout}
        edge='end'
        aria-label='logout'
        aria-haspopup='true'
        color='inherit'
      >
        <ExitToAppIcon />
      </IconButton>
    </div>
  );

  const nonAuthLinks = (
    <ul>
      <Link to='/'>
        <IconButton
          edge='end'
          aria-label='main page'
          aria-haspopup='true'
          color='inherit'
        >
          <HomeIcon />
        </IconButton>
      </Link>
      {/* <li>
                <Link to='/user-login'>Darbuotojo prisijungimas</Link>
              </li> */}
    </ul>
  );

  const getLinks = (isAuthenticated, isAdmin) => {
    if (isAuthenticated && !isAdmin) {
      return authLinks;
    }
    if (isAuthenticated && isAdmin) {
      return adminLinks;
    }
    return nonAuthLinks;
  };

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            ITVS
          </Typography>
          <div className={classes.grow} />

          {!loading && (
            <Fragment>{getLinks(isAuthenticated, isAdmin)}</Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

PrimaryAppBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(PrimaryAppBar);
