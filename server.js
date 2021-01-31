const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const clarifai = require('clarifai')
const path = require('path')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')

const PORT = process.env.PORT || 5000

/*const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'postgresql-crystalline-04284',
    user: 'postgres',
    password: '',
    database: 'face-recognition'
  }
});*/

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
})

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

//app.get('/*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'build', 'index.html'));
//});

app.post('/register', register.handleRegister(knex, bcrypt));
app.post('/signin', signin.handleSignIn(knex, bcrypt));
app.post('/imageurl', image.handleApiCall(clarifai));
app.put('/image', image.handleImage(knex));

app.listen(PORT, () => {
  console.log('app is running on port ' + PORT);
})
