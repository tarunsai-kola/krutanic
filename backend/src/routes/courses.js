const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get All Courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get Course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;