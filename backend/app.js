const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
const morgan = require('morgan');
require('express-async-errors');

dotenv.config();
const userRouter = require('./routes/user');
const friendRouter = require('./routes/friend');
const { handleNotFound } = require('./utils/helper');
app.use(express.json());
app.use(morgan('dev'));
require('./db');
// const userRouter = require('./routes/user');

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/friend', friendRouter);

app.use('/*', handleNotFound);

app.use((err, req, res, next) => {
  console.log('Error:', err);
  res.status(500).json({ error: err.message || err });
});

console.log('Hello darkness my old friend');

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
