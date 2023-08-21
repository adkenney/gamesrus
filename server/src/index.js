const express = require('express');
const router = require('./router');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
