import React from 'react';
import PropTypes from 'prop-types';
import './RecipeList.css';
import { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";

const RecipeList = ({onRecipeClick}) =>{ 
   const [recipes, setRecipes] = useState(
     JSON.parse(localStorage.getItem("recipeFormData")) || []
   );
   const [state, setState] = useState({
     query: "",
     list: recipes
   })

   const handleQueryChange = (event) =>{
     const results = recipes.filter(recipe => {
       if(event.target.value === "") return recipes
       return recipe.recipeName.toLowerCase().includes(event.target.value.toLowerCase())
     })

     setState({
       query: event.target.value,
       list: results})

     console.log(state.list);

   } 

  return (
    <div>
      {(recipes.length > 0 && (
        <div>
          <div>
            <form className="search_bar">
              <input
                type="search"
                value={state.query}
                placeholder="Search"
                onChange={handleQueryChange}
              />
            </form>
          </div>
          <table>
            <thead>
              <tr>
                <th> Saved Recipes</th>
              </tr>
            </thead>
            <tbody>
              {state.list.map((recipe) => (
                <tr
                  key={recipe.recipeName}
                  onClick={() => onRecipeClick(recipe)}
                >
                  <td>{recipe.recipeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )) ||
        (recipes.length === 0 && (
          <div>
            <form>
              <input
                type="search"
                value={state.query}
                onChange={handleQueryChange}
              />
            </form>
            <h1> No recipes saved!</h1>
          </div>
        ))}
    </div>
  );
        }

RecipeList.propTypes = {};

RecipeList.defaultProps = {};

export default RecipeList;
