import React from 'react';
import { Link } from 'react-router-dom';

const MainActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn btn-light'>
        <i class='fas fa-user-circle text-primary'></i> Keisti profilį
      </Link>
      <Link to='/posts' class='btn btn-light'>
        <i class='fab fa-black-tie text-primary'></i> Sukurti pranešimą
      </Link>
      <Link to='add-education' class='btn btn-light'>
        <i class='fas fa-graduation-cap text-primary'></i> Test
      </Link>
    </div>
  );
};

export default MainActions;
