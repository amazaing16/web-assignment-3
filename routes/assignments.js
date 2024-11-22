const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');

// Get all assignments
router.get('/', async (req, res) => {
  const assignments = await Assignment.find().sort({ deadline: 1 });
  res.render('index', { assignments });
});

// Render Add Form
router.get('/assignments/add', (req, res) => {
  res.render('form', { assignment: {}, action: '/assignments/add' });
});

// Add Assignment
router.post('/assignments/add', async (req, res) => {
  await Assignment.create(req.body);
  res.redirect('/');
});

// Render Edit Form
router.get('/assignments/edit/:id', async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  res.render('form', { assignment, action: `/assignments/edit/${assignment._id}` });
});

// Update Assignment
router.post('/assignments/edit/:id', async (req, res) => {
  await Assignment.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// Delete Assignment
router.get('/assignments/delete/:id', async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  res.render('confirm', { assignment });
});

router.post('/assignments/delete/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
