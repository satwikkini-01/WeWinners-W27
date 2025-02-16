import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <h2>Farmers Market</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </div>
    </nav>
  );
};

export default Navbar;
