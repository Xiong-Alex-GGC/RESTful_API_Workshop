const { pool } = require('../config');

class FoodModel {
    static async getAllFoods() {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM foods');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getFoodById(foodId) {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM foods WHERE foodID = ?', foodId);
            return rows[0]; // Assuming the ID is unique, return the first result
        } catch (error) {
            throw error;
        }
    }

    static async createFood(name, description) {
        try {
            const [result] = await pool.query('INSERT INTO foods (Name, Description) VALUES (?, ?)', [name, description]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateFood(foodId, name, description) {

        try {
            const [result] = await pool.query('UPDATE foods SET Name = ?, Description = ? WHERE foodID = ?', [name, description, foodId]);

            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    static async deleteFood(foodId) {
        try {
            const [result] = await pool.query('DELETE FROM foods WHERE foodID = ?', foodId);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FoodModel;
