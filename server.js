const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

console.log("Loading routes...");

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

console.log("userRoutes:", userRoutes);
console.log("taskRoutes:", taskRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});