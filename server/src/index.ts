import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { authMiddleware } from './middleware/authMiddleware';
import { connectDB } from './lib/mongoose';


/* ROUTE IMPORT */
import userRoutes from './routes/userRoutes';
import plaidRoutes from './routes/plaidRoutes';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get('/', (req, res) => {
  res.send('This is landing page route');
});

app.use('/users', authMiddleware(), userRoutes);
app.use('/plaid', authMiddleware(), plaidRoutes);

/* SERVER */
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* MONGOOSE SETUP */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});