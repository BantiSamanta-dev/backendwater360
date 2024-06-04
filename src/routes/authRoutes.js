import express from 'express';
import passport from '../utils/auth.js'; // Import Passport instance from auth.js
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/usercontroller.js';

const router = express.Router();

// Google authentication route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  
  res.redirect('/dashboard');
});

// Registration route
router.post('/auth/register', registerUser);

// Login route
router.post('/auth/login', loginUser);

// Logout route
router.get('/auth/logout', logoutUser);

// Profile route (requires authentication)
router.get('/auth/profile', getUserProfile);

export default router;
