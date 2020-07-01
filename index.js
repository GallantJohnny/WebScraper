const express = require('express');
const app = express();
const dotenv = require('dotenv');
const router = require('./api/routes');

dotenv.config();
app.use('/api/', router);

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on ${process.env.SERVER_PORT}`));