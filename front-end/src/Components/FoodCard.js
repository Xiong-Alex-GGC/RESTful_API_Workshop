import React, { useState, useEffect } from 'react';

const FoodCard = ({ food, onUpdate }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(food.Name);
    const [description, setDescription] = useState(food.Description);

    const apiToken = 'secretToken';



    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const apiToken = 'secretToken';
        const updatedFood = { ...food, Name: name, Description: description };

        fetch(`http://localhost:4000/foods/${food.FoodID}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedFood)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update food item');
                }
                // If update is successful, trigger onEdit callback with the updated food
                onUpdate();
                setIsEditing(false); // Exit edit mode
            })
            .catch(error => {
                console.error('Error updating food item:', error);
            });
    };

    const handleDelete = () => {

        fetch(`http://localhost:4000/foods/${food.FoodID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete food item');
                }
                // If deletion is successful, trigger onDelete callback
                onUpdate(food);
            })
            .catch(error => {
                console.error('Error deleting food item:', error);
            });
    };

    // useEffect(() => {
    //     console.log('Name:', name);
    // }, [name]);

    // // Log description whenever it changes
    // useEffect(() => {
    //     console.log('Description:', description);
    // }, [description]);

    return (
        <div style={cardStyle}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={inputStyle}

                    />
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={inputStyle}
                    />
                    <div style={buttonContainerStyle}>
                        <button style={buttonStyle} onClick={handleSave}>Save</button>
                        <button style={buttonStyle} onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <h2 style={titleStyle}>{food.Name}</h2>
                    <p style={descriptionStyle}>{food.Description}</p>
                    <div style={buttonContainerStyle}>
                        <button style={buttonStyle} onClick={handleEdit}>Edit</button>
                        <button style={buttonStyle} onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

// Inline styles
const cardStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
    fontSize: '20px',
    marginBottom: '10px',
    color: 'black',
};

const descriptionStyle = {
    fontSize: '16px',
    color: '#555',
};

const inputStyle = {
    width: '90%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9', 
    marginBottom: '10px',
};

const buttonContainerStyle = {
    marginTop: '10px',
};

const buttonStyle = {
    marginRight: '10px',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default FoodCard;
