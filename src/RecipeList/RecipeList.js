import React from 'react';
import PropTypes from 'prop-types';
import './RecipeList.css';
import { useState } from 'react';

const RecipeList = ({onRecipeClick}) =>{ 
   const [recipes, setRecipes] = useState(
     JSON.parse(localStorage.getItem("recipeFormData")) || []
   );
  // const recipeList = JSON.parse(localStorage.getItem("recipeFormData"))
  // console.log(recipeList);
  return (
    <div>
  {(recipes.length > 0 && (
    <table>
      <thead>
        <tr>
          <th> Saved Recipes</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => (
          <tr key={recipe.recipeName} onClick={() => onRecipeClick(recipe)}>
            <td>{recipe.recipeName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) ) || (recipes.length ==0 && (
    <h1> No recipes saved!</h1>
  )) } 
</div>
  )
        }

RecipeList.propTypes = {};

RecipeList.defaultProps = {};

export default RecipeList;
