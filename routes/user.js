import express from "express";
import config from "../config.js";
import { User } from "../models/users.js";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check if username already exists
      const user = User.findByEmail(email);
      if (user===null) {
        return res.status(409).json({ message: 'Username already exists' });
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Add user to database
      const newUser = {email, password: hashedPassword };
      let savedUser = User.createUser(newUser);
      console.log(savedUser)
  
      // Create JWT token
      const token = jwt.sign({ id: savedUser._id}, config.jwtKey);
  
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Login route
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by username
      const user = User.find((user) => user.email === email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Create JWT token
      const token = jwt.sign({ id: user.id }, secretKey);
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  export default router;