require('dotenv').config();
const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB(databse connect ho rha hai)
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});