import dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config({
  path: process.env.NODE_ENV!.trim() === 'production' ? 'env/.env' : 'env/.dev.env',
});

import { connectDb } from './db';
import { adminsRouter, authRouter, customersRouter, modalitiesRouter, plansRouter, membershipsRouter } from './routers';
import { errorHandler, notFound } from './middlewares';
import { addAdm } from './scripts';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(
  express.json({
    verify: (req, res, buf) => {
      Object.defineProperty(req, 'rawBody', {
        configurable: false,
        enumerable: true,
        value: buf,
        writable: false,
      });
    },
  })
);

app.use('/v1/admins', adminsRouter);
app.use('/v1/auth', authRouter);
app.use('/v1/customers', customersRouter);
app.use('/v1/modalities', modalitiesRouter);
app.use('/v1/plans', plansRouter);
app.use('/v1/memberships', membershipsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    const port = process.env.PORT || 8080;

    connectDb(process.env.MONGO_URI!);

    app.listen(port, async () => {
      console.log(`Server listening on port ${port}`);
      try {
        await addAdm();
      } catch (err) {
        console.log('ADMs já inseridos');
      }
    });
  } catch (err) {
    console.log('Failed to start server:', err);
  }
};

start();
