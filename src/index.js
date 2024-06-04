// app.js or app.mjs

import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import connectDB from './DB/index.js';
import authRoutes from '../src/routes/authRoutes.js';
import routineRoutes from '../src/routes/routineRoutes.js';
import tenderRoute from '../src/routes/tenderRoute.js' // Import the tenderRoutes

const PORT = 8001;
const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(session({
  secret: 'banti',
  resave: false,
  saveUninitialized: false,
}));

app.use('/api', authRoutes);
app.use('/api', routineRoutes);
app.use('/api', tenderRoute); // Mount the tenderRoutes

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("There is some error ", error);
  });

