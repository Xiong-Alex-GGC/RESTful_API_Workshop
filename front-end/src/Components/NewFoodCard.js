import React, { useState } from 'react';

const NewFoodCard = ({ onUpdate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = () => {
        const apiToken = 'secretToken';
        const newFood = { Name: name, Description: description };
    
        fetch('http://localhost:4000/foods', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFood)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create food item');
            }
            //clear the input fields after successful creation
            setName('');
            setDescription('');
            handleCancel(); //resets button
            onUpdate();
        })
        .catch(error => {
            console.error('Error creating food item:', error);
        });
    };
    

    const handleCancel = () => {
        setIsCreating(!isCreating);
    };

    const toggleCreating = () => {
        setIsCreating(!isCreating);
    };

    return (
        <div>
            {!isCreating ? (
                <div style={plusStyle} onClick={toggleCreating}>+</div>
            ) : (
                <div style={cardStyle}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={inputStyle}
                    />
                    <div style={buttonContainerStyle}>
                        <button style={buttonStyle} onClick={handleCreate}>Create</button>
                        <button style={buttonStyle} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const plusStyle = {
    fontSize: '48px',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '200px', 
};


const cardStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
};

export default NewFoodCard;
