const express = require('express');

const port = 8000;

const dotenv = require('dotenv');

const db = require("./config/db");


dotenv.config();


const app = express();
app.use(express.json()); 


app.use('/api/auth', require("./routes/authRoutes"));
app.use('/api/courses', require("./routes/courseRoutes"));
app.use('/api/enrollment', require('./routes/enrollmentRoutes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});