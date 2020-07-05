const express = require('express');
const app = express();
const dotenv = require('dotenv');
const router = require('./api/routes');

dotenv.config();

// Parse incoming body with json payload
app.use(express.json());
app.use('/api', router);

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on ${process.env.SERVER_PORT}`));