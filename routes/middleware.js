const Card = require('../models').Card;

const newTask = (req,res,next) => {
  if (req.body.title === '' ||
    req.body.priority === '' ||
    req.body.createdBy === '' ||
    req.body.assignedTo === ''
    ) {
    res.json({error:'Please fill out all fields'});
  } else {
    next();
  }
};

const characterLimit = (req,res,next) => {
  console.log('hit');
  if (req.body.title.length > 254 ||
    req.body.createdBy.length > 254 ||
    req.body.assignedTo.length > 254
    ) {
    res.json({error:'Surpassed character limit of 255'});
  } else {
    next();
  }
};

const editTask = (req,res,next) => {
  Card.findById(req.body.id)
    .then(task => {
      if(req.body.title === '') {
        req.body.title = task.title;
      }
      if(req.body.priority === '') {
        req.body.priority = task.priority;
      }
      if(req.body.createdBy === '') {
        req.body.createdBy = task.createdBy;
      }
      if(req.body.assignedTo === '') {
        req.body.assignedTo = task.assignedTo;
      }
      next();
    })
    .catch(e => {
      res.json({
        success:false,
        error: e
      });
    });
};


module.exports = {
  newTask,
  editTask,
  characterLimit
};