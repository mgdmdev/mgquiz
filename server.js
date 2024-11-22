// server.js

const app = require("./src/app");
const connectDB = require("./src/config/db");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
