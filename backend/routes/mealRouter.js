const express = require('express');
const mealController = require('../controllers/mealController');
const router = express.Router();

// GET all Meal
router.get('/getAll', mealController.getAllMeals);

// GET a single Meal
router.get('/get/:id', mealController.getMeal);

// Create a new Meal
router.post('/create', mealController.createMeal);

// DELETE a Meal
router.delete('/delete/:id', mealController.deleteMeal);

//  UPDATE an existing Meal
router.patch('/update/:id', mealController.updateMeal);

module.exports = router;
