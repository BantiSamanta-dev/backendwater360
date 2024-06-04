import User from '../models/users.m.js'
import jwt from 'jsonwebtoken';
import{secretKey} from '../middlewares/config.js'
import bcrypt from 'bcryptjs';


const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username, email, and password are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please provide username, email, and password' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Ensure password meets certain criteria (e.g., length)
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Generate password hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, passwordHash });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

 
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

 
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
    console.log('user login successfully')
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const logoutUser = async (req, res) => {
  req.logout();
  res.redirect('/');
};

// Get user profile (requires authentication)
const getUserProfile = async (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated, send profile data
    res.status(200).json({ user: req.user });
  } else {
    // User is not authenticated, send error
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export { registerUser, loginUser, logoutUser, getUserProfile };
