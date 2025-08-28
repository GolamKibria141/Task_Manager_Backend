var express = require('express');
var router = express.Router();
const Todo =require('../models/todomodels');


router.get('/',function(req,res,next){
  res.render('index',{title:'Express'});
})



// Get all todos
router.get('/todos', async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    next(error);
  }
  

});

//get a single todo

// Get a single todo
router.get('/todos/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);  
  } catch (error) {
    next(error);
  }
});


// Create a todo
router.post('/todos', async (req, res, next) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      completed: req.body.completed,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

// Update a todo by ID
router.put('/todos/:id', async (req, res, next) => {

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    next(error);
  }
});

// Delete a todo by ID
router.delete('/todos/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
});



module.exports = router;
