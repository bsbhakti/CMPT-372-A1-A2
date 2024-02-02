import React from "react";
import "./RecipeForm.css";
import { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";

const RecipeForm = () => {
  const initialData = {
    recipeName: "",
    recipeIngredients: "",
    recipeDirections: "",
    date: "",
    cuisine: "",
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const savedFormData =
        JSON.parse(localStorage.getItem("recipeFormData")) || [];
      const ifExists = savedFormData.some(
        (recipe) => recipe.recipeName === formData.recipeName
      );
      if (!ifExists) {
        let date = new Date().toLocaleString();
        console.log(date);
        const updatedFormData = [
          ...savedFormData,
          {
            ...formData,
            recipeIngredients: formData.recipeIngredients.split("\n"),
            recipeDirections: formData.recipeDirections.split(","),
            date: date,
          },
        ];
        localStorage.setItem("recipeFormData", JSON.stringify(updatedFormData));
        handleReset();
      }
    } else {
      alert("Name, Ingredients and Directions cannot be empty");
    }
  };
  const handleReset = (event) => {
    setFormData(initialData);
    console.log(formData);
  };

  function validateForm() {
    if (
      formData.recipeName.length === 0 ||
      formData.recipeDirections.length === 0 ||
      formData.recipeIngredients.length === 0
    ) {
      return false;
    }
    return true;
  }

  return (
    <div className="form-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="heading">
        <MdOutlineFoodBank size={35}/>
        <h1>New Recipe</h1>
        </div>

        <div className="form-group">
          <label htmlFor="title">Recipe Name</label>
          <input
            type="text"
            id="title"
            name="recipeName"
            value={formData.recipeName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cuisine">Cuisine</label>
          <select
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
          >
            <option value="" selected disabled>
              Select Cuisine
            </option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
            <option value="French">French</option>
            <option value="Canadian">Canadian</option>
            <option value="Turkish">Turkish</option>
            <option value="Amerian">Amerian</option>
            <option value="British">British</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="recipeIngredients"
            value={formData.recipeIngredients}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="directions">Directions</label>
          <textarea
            id="directions"
            name="recipeDirections"
            value={formData.recipeDirections}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="buttons">
          <div className="form-group">
            <input type="submit" className="submit-button" />
          </div>

          <div className="form-group">
            <input
              type="button"
              className="reset-button"
              onClick={handleReset}
              value="Reset"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
