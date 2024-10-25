require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/user');
const Contact = require('./models/contact');
const OTP = require('./models/otp'); 
const rateLimit = require('./middleware/rateLimitMiddleware');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const otpRoutes = require('./routes/otpRoutes');

const app = express();
const port = process.env.PORT || 3000; 
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(rateLimit);

app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/otp', otpRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    console.log('Database connected successfully');

    if (process.env.NODE_ENV !== 'production') {
      await User.sync(); 
      await Contact.sync(); 
      await OTP.sync(); 
    }

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
