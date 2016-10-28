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
        });
        res.json({success:true});
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
    res.json({success:true});
  });

kanban.route('/edit')
  .post((req,res) =>{
    console.log('req.body',req.body);
    db.Card.findById(req.body.id)
      .then(card => {
        card.update({
          title: req.body.title,
          priority: req.body.priority,
          createdBy: req.body.createdBy,
          assignedTo: req.body.assignedTo
        });
        res.json({success:true});
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
        res.json({success:true});
      })
      .catch(err => {
        console.error(err);
      })
  })
module.exports = kanban;