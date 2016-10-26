const express = require('express');
const flash = require('connect-flash');
const app = express();
const bodyParser = require('body-parser');
// const route = require('./routes/route.js');
// const passport = require('passport');
// const LocalStrategy = require ('passport-local');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const db = require('./models');
// const config = require('./config/config.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));

app.listen(8080, function() {
  console.log('server');
  db.sequelize.sync()
    .catch(err =>{
      res.json({
        success: false,
        error: err
      });
    });
});

