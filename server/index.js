// import express from 'express';
// import dotenv from 'dotenv';
// import roomRouter from './routes/roomRouter.js';
// import mongoose from 'mongoose';
// import userRouter from './routes/userRouter.js';

// dotenv.config();

// const port = process.env.PORT || 5000;

// const app = express();

// // Middleware for CORS headers
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
//   next();
// });

// app.use(express.json({ limit: '10mb' }));

// app.use('/room', roomRouter);
// app.use('/user', userRouter);
// app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));
// app.use((req, res) => res.status(400).json({ success: false, message: 'Not Found' }));

// const startServer = async () => {
//   try {
//     // Connect to the MongoDB database
//     mongoose.connection.on('connected', () => {
//       console.log('MongoDB connected successfully');
//     });

//     mongoose.connection.on('error', (error) => {
//       console.error('MongoDB connection error:', error);
//     });

//     mongoose.connection.on('disconnected', () => {
//       console.log('MongoDB disconnected');
//     });

//     await mongoose.connect(process.env.MONGO_CONNECT, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     // Start the server
//     app.listen(port, () => console.log(`Server is listening on port: ${port}`));
//   } catch (error) {
//     console.error('Error starting server:', error);
//   }
// };

// startServer();


import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRouter.js';
import userRouter from './routes/userRouter.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware for CORS
const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow requests from your frontend
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: 'X-Requested-With,Content-Type,Authorization',
  credentials: true, // Allow cookies or other credentials if necessary
};

app.use(cors(corsOptions));

// Middleware for JSON request parsing
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/room', roomRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));

// Handle 404 errors for unknown routes
app.use((req, res) => res.status(404).json({ success: false, message: 'Not Found' }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Database and server startup
const startServer = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Start the server
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit process with failure code
  }
};

startServer();
