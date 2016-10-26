const express = require('express');
const kanban = express.Router();
const db = require('../models');

kanban.route('/apiP')
  .get((req,res) =>{
    db.Card.findAll({
      where: {
        status: 'Progress'
      }
    })
    .then(data =>{
      res.json({data});
    });
  });
kanban.route('/apiQ')
  .get((req,res) =>{
    db.Card.findAll({
      where: {
        status: 'Queue'
      }
    })
    .then(data =>{
      res.json({data});
    });
  });
kanban.route('/apiD')
  .get((req,res) =>{
    db.Card.findAll({
      where: {
        status: 'Done'
      }
    })
    .then(data =>{
      res.json({data});
    });
  });
kanban.route('/moveToProgress')
  .post((req,res) =>{
    db.Card.findById(req.body.id)
      .then(card => {
        card.update({
          title: card.title,
          priority: card.priority,
          status: 'Progress',
          createdBy: card.createdBy,
          assignedTo: card.assignedTo
        });
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
      });
  });
kanban.route('/moveToQueue')
  .post((req,res) =>{
    db.Card.findById(req.body.id)
      .then(card => {
        card.update({
          title: card.title,
          priority: card.priority,
          status: 'Queue',
          createdBy: card.createdBy,
          assignedTo: card.assignedTo
        });
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
      });
  });
kanban.route('/moveToDone')
  .post((req,res) =>{
    db.Card.findById(req.body.id)
      .then(card => {
        card.update({
          title: card.title,
          priority: card.priority,
          status: 'Done',
          createdBy: card.createdBy,
          assignedTo: card.assignedTo
        });
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
      });
  });
kanban.route('/newTask')
  .post((req,res) => {
    db.Card.create({
      title: req.body.title,
      priority: req.body.priority,
      status: 'Queue',
      createdBy: req.body.createdBy,
      assignedTo: req.body.assignedTo
    });
    res.redirect('/');
  });