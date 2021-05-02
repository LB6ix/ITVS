import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const MainActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn btn-light'>
        <Button size='large' variant='contained' color='primary'>
          Keisti profilį
        </Button>
      </Link>
      <Link to='/posts' class='btn btn-light'>
        <Button size='large' variant='contained' color='primary'>
          Sukurti pranešimą
        </Button>
      </Link>
    </div>
  );
};

export default MainActions;
