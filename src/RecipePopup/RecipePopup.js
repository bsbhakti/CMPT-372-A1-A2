import React from 'react';
import PropTypes from 'prop-types';
import './RecipePopup.css'
import { FaTimes } from "react-icons/fa";


const RecipePopup = ({ isOpen,recipe, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="header-container" onClick={onClose}>
          <FaTimes />
          <h2>{recipe.recipeName}</h2>
        </div>
        <ol className="list-header">
          Ingredients:{" "}
          {recipe.recipeIngredients.map((ingredient, index) => (
            <li className="list-item" key={index}>
              {index + 1}. {ingredient}{" "}
            </li>
          ))}
        </ol>
        <ol className="list-header">
          Directions:{" "}
          {recipe.recipeDirections.map((direction, index) => (
            <li className="list-item" key={index}>
              {index + 1}. {direction}{" "}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

RecipePopup.propTypes = {};

RecipePopup.defaultProps = {};

export default RecipePopup;
