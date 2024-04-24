const FoodModel = require('../models/foodModel');

class FoodController {
    static async getAllFoods(req, res) {
        try {
            const foods = await FoodModel.getAllFoods();
            res.json(foods);
        } catch (error) {
            console.error('Error fetching foods:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getFoodById(req, res) {
        const foodId = req.params.id;
        try {
            const food = await FoodModel.getFoodById(foodId);
            if (!food) {
                res.status(404).json({ message: 'Food not found' });
            } else {
                res.json(food);
            }
        } catch (error) {
            console.error('Error fetching food by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async createFood(req, res) {
        const name = req.body.Name;
        const description = req.body.Description;
        
        try {
            const newFoodId = await FoodModel.createFood(name, description);
            res.status(201).json({ message: 'Food item created successfully', foodID: newFoodId });
        } catch (error) {
            console.error('Error creating food item:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateFood(req, res) {
        const foodId = req.params.id;
        const name = req.body.Name;
        const description = req.body.Description;

        try {

            const affectedRows = await FoodModel.updateFood(foodId, name, description);
            if (affectedRows === 0) {
                res.status(404).json({ message: 'Food item not found' });
            } else {
                res.json({ message: 'Food item updated successfully', foodID: foodId });
            }
        } catch (error) {
            console.error('Error updating food item:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteFood(req, res) {
        const foodId = req.params.id;
        try {
            const affectedRows = await FoodModel.deleteFood(foodId);
            if (affectedRows === 0) {
                res.status(404).json({ message: 'Food item not found' });
            } else {
                res.json({ message: 'Food item deleted successfully', foodID: foodId });
            }
        } catch (error) {
            console.error('Error deleting food item:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = FoodController;
