const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();

// Add the CORS middleware
app.use(cors());

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
