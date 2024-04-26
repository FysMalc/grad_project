const express = require('express');
const {
	createIngredient,
	getIngredients,
	getIngredient,
	deleteIngredient,
	updateIngredient,
} = require('../controllers/ingredientController');
const router = express.Router();

// GET all Ingredient
router.get('/getAll', getIngredients);

// GET a single Ingredient
router.get('/get/:id', getIngredient);

// Create a new Ingredient
router.post('/create', createIngredient);

// DELETE a Ingredient
router.delete('/delete/:id', deleteIngredient);

//  UPDATE an existing Ingredient
router.patch('/update/:id', updateIngredient);

module.exports = router;
