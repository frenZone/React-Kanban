const express = require('express');
const kanban = express.Router();
const db = require('../models');

kanban.route('/api')
  .get((req,res) =>{
    db.Card.findAll()
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

kanban.route('/editQ')
  .post((req,res) =>{
    db.Card.findById(req.body.id)
      .then(card => {
        card.update({
          title: req.body.title,
          priority: req.body.priority,
          createdBy: req.body.createdBy,
          assignedTo: req.body.assignedTo
        });
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
      });
  });

kanban.route('/editP')
  .post((req,res) =>{
    db.Card.findById(req.body.id)
      .then(card => {
        card.update({
          title: req.body.title,
          priority: req.body.priority,
          createdBy: req.body.createdBy,
          assignedTo: req.body.assignedTo
        });
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
      });
  });

kanban.route('/editD')
  .post((req,res) =>{
    console.log('req.body',req.body)
    db.Card.findById(req.body.id)
      .then(card => {
        card.update({
          title: req.body.title,
          priority: req.body.priority,
          createdBy: req.body.createdBy,
          assignedTo: req.body.assignedTo
        });
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
      });
  });

kanban.route('/delete')
  .post((req,res) => {
    console.log(req.body)
    db.Card.findById(req.body.id)
      .then(card =>{
        card.destroy();
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
      })
  })
module.exports = kanban;