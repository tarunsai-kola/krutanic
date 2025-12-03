const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');

// Create Order
router.post('/', auth, async (req, res) => {
  const { courseIds, amount } = req.body;
  try {
    const order = new Order({
      user: req.user.userId,
      courseIds,
      amount
    });

    await order.save();

    // Update user enrolled courses
    await User.findByIdAndUpdate(req.user.userId, {
      $addToSet: { enrolledCourses: { $each: courseIds } }
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;