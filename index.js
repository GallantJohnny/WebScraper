const express = require('express');
const app = express();
const dotenv = require('dotenv');
const router = require('./api/routes');
// The path module provides utilities for working with file and directory paths
const path = require('path');

dotenv.config();

// Parse incoming body with json payload
app.use(express.json());
app.use('/api', router);

app.use(express.static(path.join(__dirname, "client", "build")))

// Serve index.html to browser
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));