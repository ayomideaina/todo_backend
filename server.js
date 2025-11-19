const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory "database"
let todos = [];
let idCounter = 1;

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Create a new todo
app.post('/todos', (req, res) => {
  const { title, description, dueDate, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: idCounter++,
    title,
    description: description || '',
    dueDate: dueDate || null,
    completed: completed || false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update an existing todo
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const { title, description, dueDate, completed } = req.body;

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (dueDate !== undefined) todo.dueDate = dueDate;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
