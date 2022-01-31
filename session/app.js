require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGOURI }),
  cookie: {
    _expires: 3600
  }
}));

app.get('/', (req, res) => {
  if (!req.session.visits) req.session.visits = 0;
  req.session.visits++;
  res.send(`${req.session.visits}`);
})

app.listen(PORT, function () {
  console.log('Listening on port : ', PORT)
});