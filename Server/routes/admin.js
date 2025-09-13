const express = require('express');
const jwt = require('jsonwebtoken'); 
const router = express.Router();

const { registerAdmin, loginAdmin, logoutAdmin } = require('../controller/adminController');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const isAdminLoggedIn = require('../middleware/isAdminLoggedIn');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', authenticateAdmin, logoutAdmin);

router.get('/dashboard', isAdminLoggedIn, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

router.get('/verify-admin', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ isAdmin: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ isAdmin: !!decoded.isAdmin });
  } catch (err) {
    res.json({ isAdmin: false });
  }
});



module.exports = router;
