import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/main' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>IT Turto valdymo sistema</h1>
          <p className='lead'>Valdykite savo įmonės IT turtą!</p>
          <div className='buttons'>
            <Link to='/user-login' className='btn btn-light'>
              <Button size='large' variant='contained' color='primary'>
                Darbuotojo prisijungimas
              </Button>
            </Link>
            <Link to='/admin-login' className='btn btn-light'>
              <Button size='large' variant='contained' color='primary'>
                Administratoriaus prisijungimas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
