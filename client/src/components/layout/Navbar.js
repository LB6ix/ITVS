import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i>ITVS
        </Link>
      </h1>
      <ul>
        <li>
          <a href="profiles.html">Developers</a>
        </li>
        <li>
          <Link to="/create-user">Sukurti naudotoją</Link>
        </li>
        <li>
          <Link to="/login">Prisijungti</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
