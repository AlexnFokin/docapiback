import express from 'express';
// import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware';
import { NotFoundException } from './exceptions/http.exception';
import itemRouter from './routes/itemRoutes';

const app = express();


// Middleware
// app.use(cors());
app.use(express.json());

app.use('/api/items', itemRouter)

app.use(errorMiddleware)

app.use((req, res, next) => {
    next(new NotFoundException('Endpoint not found'));
  });
  app.use(errorMiddleware);

export default app;