import React from "react";
import "./RecipeForm.css";
import { useState } from "react";

const RecipeForm = () => {
  const initialData = {
    recipeName: "",
    recipeIngredients: "",
    recipeDirections: "",
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const savedFormData =
      JSON.parse(localStorage.getItem("recipeFormData")) || [];
    const ifExists = savedFormData.some(
      (recipe) => recipe.recipeName === formData.recipeName
    );
    if (!ifExists) {
      const updatedFormData = [...savedFormData, { ...formData,recipeIngredients: formData.recipeIngredients.split(','),recipeDirections: formData.recipeDirections.split(',') }];
      localStorage.setItem("recipeFormData", JSON.stringify(updatedFormData));
      handleReset();
    }
  };
  const handleReset = (event) => {
    setFormData(initialData);
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h1>New Recipe</h1>

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
      </form>
    </div>
  );
};

export default RecipeForm;
