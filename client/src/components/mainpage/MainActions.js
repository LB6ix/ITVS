import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const MainActions = () => {
  return (
    <div>
      <Link to='/edit-profile'>
        <Button
          size='large'
          variant='contained'
          color='secondary'
          style={{ marginRight: '10px' }}
        >
          Keisti profilį
        </Button>
      </Link>
      <Link to='/posts'>
        <Button size='large' variant='contained' color='secondary'>
          Sukurti pranešimą
        </Button>
      </Link>
    </div>
  );
};

export default MainActions;
