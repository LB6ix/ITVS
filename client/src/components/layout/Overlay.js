import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CodeIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  inputRoot: {
    color: 'inherit'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const Overlay = ({
  auth: { isAuthenticated, isAdmin, loading, user },
  logout
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openAsset, setOpenAsset] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAssetClick = () => {
    setOpenAsset(!openAsset);
  };
  const handleUserClick = () => {
    setOpenUser(!openUser);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          {!loading && isAuthenticated && (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <div className={classes.grow}>
            <Typography variant='h6' noWrap>
              ITVS
            </Typography>
          </div>
          <Link to='/'>
            <IconButton
              edge='end'
              aria-label='main page'
              aria-haspopup='true'
              color='#ffffff'
            >
              <HomeIcon />
            </IconButton>
          </Link>{' '}
          {!loading && isAuthenticated && (
            <IconButton
              onClick={logout}
              edge='end'
              aria-label='logout'
              aria-haspopup='true'
              color='secondary'
            >
              <ExitToAppIcon color='secondary' />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {!loading && isAuthenticated && !isAdmin && (
          <List>
            <ListItem button component={Link} to='/main'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Pagrindinis puslapis' />
            </ListItem>
            <ListItem button component={Link} to='/posts'>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary='Pranešimai' />
            </ListItem>
            <ListItem
              button
              component={Link}
              to='/hardware'
              className={classes.nested}
            >
              <ListItemIcon>
                <ImportantDevicesIcon />
              </ListItemIcon>
              <ListItemText primary='Aparatinė įranga' />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <ExitToAppIcon color='secondary' />
              </ListItemIcon>
              <ListItemText primary='Atsijungti' />
            </ListItem>
          </List>
        )}
        {!loading && isAuthenticated && isAdmin && (
          <List>
            <ListItem button onClick={handleAssetClick}>
              <ListItemIcon>
                <BusinessCenterIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary='IT turto valdymas' />
              {openAsset ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAsset} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem
                  button
                  component={Link}
                  to='/hardware'
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <ImportantDevicesIcon />
                  </ListItemIcon>
                  <ListItemText primary='Aparatinė įranga' />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to='/software'
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary='Programinė įranga' />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={handleUserClick}>
              <ListItemIcon>
                <SupervisorAccountIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary='Naudotojų valdymas' />
              {openUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openUser} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem
                  button
                  component={Link}
                  to='/user-list'
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <FormatListNumberedIcon />
                  </ListItemIcon>
                  <ListItemText primary='Naudotojų sąrašas' />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to='/create-user'
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary='Sukurti naudotoją' />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button component={Link} to='/posts'>
              <ListItemIcon>
                <MailIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary='Pranešimų valdymas' />
            </ListItem>
            <ListItem button component={Link} to='/logs'>
              <ListItemIcon>
                <LockIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary='Įvykių žurnalas' />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to='/main'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Pagrindinis puslapis' />
            </ListItem>
            <ListItem button component={Link} to={`/profile/${user._id}`}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary='Profilis' />
            </ListItem>
            <ListItem button component={Link} to='/edit-profile'>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary='Keisti profilį' />
            </ListItem>
            <Divider />
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <ExitToAppIcon color='secondary' />
              </ListItemIcon>
              <ListItemText primary='Atsijungti' />
            </ListItem>
          </List>
        )}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
};

Overlay.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Overlay);
