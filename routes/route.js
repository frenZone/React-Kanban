const express = require('express');
const kanban = express.Router();
const db = require('../models');
const validate = require('./middleware');
const passport = require('passport');


kanban.route('/')
  .get((req,res) =>{
    db.Card.findAll({ order: [['priority', 'DESC']] })
      .then(data =>{
        res.json({data});
      });
  });

kanban.route('/move')
  .post((req,res) =>{
    db.Card.findById(req.body.id)
      .then(card => {
        card.update({
          title: card.title,
          priority: card.priority,
          status: req.body.status,
          createdBy: card.createdBy,
          assignedTo: card.assignedTo
        })
        .then(_=>{
          db.Card.findAll({order: 'priority DESC' })
          .then(data => {
            res.json({data});
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  });
kanban.route('/newTask')
  .post(validate.newTask,validate.characterLimit, (req,res) => {
    db.Card.create({
      title: req.body.title,
      priority: req.body.priority,
      status: 'Queue',
      createdBy: req.body.createdBy,
      assignedTo: req.body.assignedTo
    })
    .then(_=>{
      db.Card.findAll({order: 'priority DESC' })
      .then(data => {
        res.json({data});
      });
    });

  });

kanban.route('/edit')
  .post(validate.editTask, (req,res) =>{
    db.Card.findById(req.body.id)
      .then(card => {
        card.update({
          title: req.body.title,
          priority: req.body.priority,
          createdBy: req.body.createdBy,
          assignedTo: req.body.assignedTo
        })
        .then(_=>{
          db.Card.findAll({order: 'priority DESC' })
          .then(data => {
            res.json({data});
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  });

kanban.route('/delete')
  .post((req,res) => {
    db.Card.findById(req.body.id)
      .then(card =>{
        card.destroy()
        .then(_=>{
          db.Card.findAll({order: 'priority DESC' })
          .then(data => {
            res.json({data});
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  });

kanban.route('/login')
  .post((req,res,next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({success:false});
      } else {
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          } else {
            return res.json({
              success: true,
              username: user.username,
              id: user.id
            })
          }
        });
      }
    }) (req, res, next);
  });


module.exports = kanban;