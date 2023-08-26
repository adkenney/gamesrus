const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const gameRoutes = require('./routes/gameRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const platformRoutes = require('./routes/platformRoutes');
const genreRoutes = require('./routes/genreRoutes');

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.use('/api/games', gameRoutes);
app.use('/api/publishers', publisherRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/genres', genreRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
