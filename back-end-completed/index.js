const express = require('express');
const cors = require('cors');
const foodRoutes = require('./routes/foodRoutes');

const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());
app.use(express.json());

// //default route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Use food routes
app.use('/foods', foodRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
