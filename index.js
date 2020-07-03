const express = require('express');
const app = express();
const dotenv = require('dotenv');
const router = require('./api/routes');

dotenv.config();
// Parse incoming body with json payload
app.use(express.json());
app.use('/api', router);

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on ${process.env.SERVER_PORT}`));