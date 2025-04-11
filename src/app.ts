import express from 'express';
<<<<<<< HEAD
import cors from 'cors';
import pool from './config/db';

const app = express();

pool.query('SELECT NOW()', (err,res) => {
  if(err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database:', res.rows);
  }
})

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/healthcheck', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'API is sdf update',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    });
  });

// app.use('/api/v1', exampleRoutes);
=======
import { errorHandler } from './middlewares/errorHandler';
import itemRouter from './routes/itemRoutes';


const app = express();

app.use(express.json())

app.use('api/items', itemRouter)

app.use(errorHandler)
>>>>>>> 4be350b (added express)

export default app;