const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/duel_masters')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const gameSessionRoutes = require('./routes/gameSessionRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameSessionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Simple route
app.get('/', (req, res) => res.send('API Running'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


