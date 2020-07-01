const express = require('express');
const app = express();
const port = 5000;

app.use('/', router);

app.listen(port, () => console.log(`Server is running on ${port}`));