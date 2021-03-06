const express = require('express');
const flash = require('connect-flash');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require ('passport-local');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const db = require('./models');
const kanban = require('./routes/route.js');
const configSecret = require('./config/config.json').secret;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

app.use(bodyParser.urlencoded({extended:true}));

// Check to see what dev environment we are in
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;


//passport, user authentication
app.use(session({
  store: new RedisStore(),
  secret: configSecret,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy ((username, password, done)=>{
  db.User.findOne({
    where: {
      username
    }
  })
  .then((user)=>{
    if(user === null) {
      return done(null,false);
    } else {
      bcrypt.compare(password,user.password,(err,result)=>{
        if(!result){
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    }
  });
}));

passport.serializeUser((user, done)=> {
  return done(null, user);
});

passport.deserializeUser((user, done)=>{
  return done(null, user);
});



if (isDeveloping) {
  app.set('host', 'http://localhost');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  const response = (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.resolve(__dirname, 'dist/index.html')));
    res.end();
  };

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use('/',kanban);
  app.get('*', response);
} else {
  app.use(express.static(`${__dirname}/dist`));
  app.use('/',kanban);
  app.get('*', (req, res) => {
    res.write(
      fs.readFileSync(path.resolve(__dirname, 'dist/index.html'))
    );
  });
}

app.listen(port, function() {
  console.log(`==> 🌎 Listening on port ${port}. ` +
    `Open up http://localhost:${port}/ in your browser.`);
  db.sequelize.sync()
    .catch(err =>{
      res.json({
        success: false,
        error: err
      });
    });
});

