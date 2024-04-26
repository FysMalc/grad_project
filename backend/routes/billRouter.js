const express = require('express');
const billRouter = require('../controllers/billController');
const router = express.Router();

// GET all Ingredient
router.get('/getAll', billRouter.getAllBills);

// GET a single Ingredient
// router.get('/:id', getIngredient);

// Create a new Ingredient
router.post('/create', billRouter.createBill);

// DELETE a Ingredient
// router.delete('/:id', deleteIngredient);

//  UPDATE an existing Ingredient
// router.patch('/:id', updateIngredient);

module.exports = router;
