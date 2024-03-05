const { urlencoded } = require('express');
const express = require('express')
const path = require("path");
const {Pool} = require('pg');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var pool = new Pool(
    {
        user:'postgres',
        host: 'localhost',
        password: '4123',
        database: 'cmpt372_a2'
    }
)
var port = 8080

app.use(express.static(path.join(__dirname,'..','frontend','build')))

async function addRecipes(name, directions, cuisine){
    const addRecipe = `INSERT into recipes(name,directions,cuisine) VALUES($1,$2, $3)`;
    const checkIfExists = `SELECT COUNT(name) from recipes WHERE recipes.name = $1`;
    var count = await pool.query(checkIfExists, [name]);
    console.log("this is count of recipe name", count.rows[0].count);

    if(count.rows[0].count > 0){
        // modify and dont insert
        // res.send("Cannot insert it exists");
         console.log("cannot add already exists");
         return 0;
    }
    else {
        //insert 
    await pool.query(addRecipe, [name, directions, cuisine]);
    return 1;


    }



}

app.post('/submitForm',async (req,res,next)=> {
    console.log("creating", req.body);
    const createIngredients = `CREATE TABLE IF NOT EXISTS ingredients(id serial PRIMARY KEY, name VARCHAR(30))`;
    const createRecipes = `CREATE TABLE IF NOT EXISTS recipes(id serial PRIMARY KEY, name VARCHAR(30), directions VARCHAR(200), cuisine VARCHAR(10))`;
    const createRecipeIngredients = `CREATE TABLE IF NOT EXISTS recipeIngredients(recipeId INT REFERENCES recipes(id) ON DELETE CASCADE, ingredientID INT REFERENCES ingredients(id) ON DELETE CASCADE)`;

    const addIngredients = `INSERT into ingredients(name) VALUES($1)`

    const checkIngredientExists = ""
    const addIngredientRecipes = `INSERT INTO recipeIngredients()`

    await pool.query(createIngredients);
    await pool.query(createRecipes);
    await pool.query(createRecipeIngredients);

    var addResult = await addRecipes(
      req.body.recipeName,
      req.body.recipeDirections,
      req.body.cuisine
    );
    if(!addResult){
         console.log("cannot add already exists");
        res.redirect("/")
    }
    else {
    res.redirect("/");

    }
    

})

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})

