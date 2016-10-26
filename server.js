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

app.get('/apiP',(req,res) =>{
  db.Card.findAll({
    where: {
      status: 'Progress'
    }
  })
  .then(data =>{
    res.json({data});
  });
});
app.get('/apiQ',(req,res) =>{
  db.Card.findAll({
    where: {
      status: 'Queue'
    }
  })
  .then(data =>{
    res.json({data});
  });
});
app.get('/apiD',(req,res) =>{
  db.Card.findAll({
    where: {
      status: 'Done'
    }
  })
  .then(data =>{
    res.json({data});
  })
})
app.post('/moveToProgress',(req,res) =>{
  db.Card.findById(req.body.id)
    .then(card => {
      card.update({
        title: card.title,
        priority: card.priority,
        status: 'Progress',
        createdBy: card.createdBy,
        assignedTo: card.assignedTo
      })
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
    })
})
app.post('/moveToQueue',(req,res) =>{
  db.Card.findById(req.body.id)
    .then(card => {
      card.update({
        title: card.title,
        priority: card.priority,
        status: 'Queue',
        createdBy: card.createdBy,
        assignedTo: card.assignedTo
      })
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
    })
})
app.post('/moveToDone',(req,res) =>{
  db.Card.findById(req.body.id)
    .then(card => {
      card.update({
        title: card.title,
        priority: card.priority,
        status: 'Done',
        createdBy: card.createdBy,
        assignedTo: card.assignedTo
      })
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
    })
})
app.post('/newTask',(req,res) => {
  db.Card.create({
    title: req.body.title,
    priority: req.body.priority,
    status: 'Queue',
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo
  })
  res.redirect('/');
})



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

