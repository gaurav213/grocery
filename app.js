// Grabbing dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
MONGO_URI = process.env.MONGO_URI || "mongodb+srv://dada:dada@cluster0.noz8roy.mongodb.net/?retryWrites=true&w=majority";

// Routes
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

// Making app
const app = express();

// Bodyparser middleware
app.use(express.json());

// DB connect
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(error => console.log(error));

// Use Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

// // Server static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// };

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Running on port 5000'));