const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const clarifai = require('clarifai')
const path = require('path')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'password',
    database: 'face-recognition'
  }
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/register', register.handleRegister(knex, bcrypt));
app.post('/signin', signin.handleSignIn(knex, bcrypt));
app.post('/imageurl', image.handleApiCall(clarifai));
app.put('/image', image.handleImage(knex));

app.listen(5000, () => {
  console.log(`app is running on port 5000`);
})
