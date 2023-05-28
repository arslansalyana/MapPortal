import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        MapShop
      </Link>
      <div className="navbar-nav">
        <NavLink className="nav-link" exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/about" activeClassName="active">
          About Us
        </NavLink>
        <NavLink className="nav-link" to="/data" activeClassName="active">
          Data
        </NavLink>
        <NavLink className="nav-link" to="/wms" activeClassName="active">
          WMS
        </NavLink>
        <NavLink className="nav-link" to="/wfs" activeClassName="active">
          WFS
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;