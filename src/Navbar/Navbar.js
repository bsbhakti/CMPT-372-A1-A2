import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./Navbar.css"


const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Add Recipe</Link>
      </li>
      <li>
        <Link to="/recipeList">Recipes</Link>
      </li>
    </ul>
  </nav>
);

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
