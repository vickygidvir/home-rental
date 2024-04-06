const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set
const MONGO_URL = process.env.MONGO_URL;

// Check if PORT and MONGO_URL are provided
if (!PORT || !MONGO_URL) {
    console.error("Please provide PORT and MONGO_URL environment variables.");
    process.exit(1);
}

mongoose.connect(MONGO_URL, {
    dbName: "Dream_Nest",
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
});

// Simple GET API to accept GET request in "/" path 
app.get("/", (req, res) => {
    res.status(200).send("Hey, Welcome to DreamNest");
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
