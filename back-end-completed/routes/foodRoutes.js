const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const FoodController = require('../controllers/foodController');

// Routes without authentication
router.get('/', FoodController.getAllFoods);
router.get('/:id', FoodController.getFoodById);

// Routes with authentication
router.post('/', authenticateToken, FoodController.createFood);
router.put('/:id', authenticateToken, FoodController.updateFood);
router.delete('/:id', authenticateToken, FoodController.deleteFood);

module.exports = router;

//to apply to all utilize router.use(authenticationToken);