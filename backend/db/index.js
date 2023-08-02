const mongoose = require('mongoose');

mongoose
  .connect(`${process.env.MONGO_DB_CONNECT}`)
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((ex) => {
    console.log('DB connection failed: ', ex);
  });
