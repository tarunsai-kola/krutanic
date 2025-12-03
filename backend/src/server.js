const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/krutanic', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Import Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const orderRoutes = require('./routes/orders');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Krutanic API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});