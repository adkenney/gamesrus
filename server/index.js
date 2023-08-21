const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(morgan('tiny'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
