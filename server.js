const app = require("./src/app"); // Import the Express app
const mongoose = require("mongoose");

// Load environment variables
require("dotenv").config();

// Set the port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`MongoDB Connected: ${process.env.MONGO_URI}`);
        // Start the server only after successful database connection
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1); // Exit the process if the database connection fails
    });
