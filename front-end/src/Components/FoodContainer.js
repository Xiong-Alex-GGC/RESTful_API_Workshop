import React, { useState, useEffect } from 'react';
import FoodCard from './FoodCard';
import NewFoodCard from './NewFoodCard';

const FoodContainer = () => {
    const [foods, setFoods] = useState([]);

    // Function to fetch food data
    const fetchFoodData = () => {
        fetch('http://localhost:4000/foods')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch food data');
                }
                return response.json();
            })
            .then(data => {
                // Assuming data is an array of food items
                setFoods(data);
            })
            .catch(error => {
                console.error('Error fetching food data:', error);
            });
    };

    // Function to handle deletion of a food item
    const handleUpdate = () => {
        fetchFoodData(); //update food list
    };

    useEffect(() => {
        // Fetch food data on component mount
        fetchFoodData();
    }, []); // Empty dependency array means this effect runs only once on component mount

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Food List</h1>
            <div style={foodContainerStyle}>
                {foods.map((food, index) => (
                    <FoodCard key={index}
                        food={food}
                        onUpdate={handleUpdate}
                    />
                ))}
                <NewFoodCard
                    onUpdate={handleUpdate}
                />
            </div>
        </div>
    );
};

const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
};

const titleStyle = {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
};

const foodContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gridGap: '20px',
};

export default FoodContainer;