const Card = require('../models').Card;
const maxInputLength = 255;

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
  if ([req.body.title.length,
      req.body.createdBy.length,
      req.body.assignedTo.length
      ].some(length => {
        return length > maxInputLength
      })) {
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

const authentication = (req, res, next) => {
  if(!req.isAuthenticated()){
    res.redirect('/login');
  } else {
    return next();
  }
};

function username(req,res,next) {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if (user === null) {
      if (req.body.username.length > 5 && req.body.password.length > 5) {
        bcrypt.genSalt((err,salt)=>{
          if(err){
            console.error(err);
          }
          bcrypt.hash(req.body.password, salt, (err,hash)=>{
            if(err){
              console.error(err);
            }
            req.body.password = hash;
            next();
          });
        });
      } else {
        res.json({error:'Username and password must be at least 6 characters long'})
      }
    } else {
      res.json({error:'Username is already in use'})
    }
  })
  .catch(err => {
    res.json({
      success: false,
      error: err
    });
  });
}

function password(req,res,next) {
  if (req.body.confirmPassword === req.body.password) {
    next();
  } else {
    res.json({error:'passwords do not match'});
  }
}

module.exports = {
  newTask,
  editTask,
  characterLimit,
  authentication,
  username,
  password
};