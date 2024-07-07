const gameRoutes = require('./routes/gameRoutes');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/game', gameRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/duel_masters', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Simple route
app.get('/', (req, res) => res.send('API Running'));

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Game session routes
const gameSessionRoutes = require('./routes/gameSessionRoutes');
app.use('/api/game-sessions', gameSessionRoutes);

// AI routes
const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
