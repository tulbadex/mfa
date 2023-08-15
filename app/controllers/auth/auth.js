const User = require('../../models/user'); // Update the path as needed
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.AUTH_SECRETE, {
        expiresIn: maxAge
    })
};

const register = async (req, res) => {
    try {
        // Extract user information from the request body
        const { username, firstname, lastname, email, password } = req.body;
  
        // Check if username or email already exists
        const existingUser = await User.findOne({
          where: {
            [Op.or]: [{ username }, { email }]
          }
        });
  
        if (existingUser) {
          return res.status(401).json({ status: false, message: 'Username or email already exists' });
        }
    
        // Create a new user using the User model
        await User.create({
          username,
          firstname,
          lastname,
          email,
          password,
        });
    
        res.status(201).json({ status: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error registering user' });
    }
}

const login = async (req, res) => {
    try {
        // Extract user information from the request body
        const { username, password } = req.body;
    
        // Check if username or email already exists
        const user = await User.findOne({
          where: {
            username
          }
        })
    
        if (!user) {
          return res.status(401).json({ status: false, message: 'Invalid credentials' });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
            return res.status(401).json({ status: false, message: 'Invalid credentials' });
        }
        // Generate a verification code (you can modify this as needed)
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
    
        // Store user's ID in the session
        req.session.userId = user.id;
        req.session.verificationCode = verificationCode;
    
        // Send email with verification code
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
    
        const mailOptions = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: 'Verification Code',
          text: `Your verification code is: ${verificationCode}`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ status: false, message: 'Error sending email' });
          } else {
            res.status(200).json({ status: true, message: 'Verification code sent successfully' });
          }
        });
    
        // res.status(200).json({ status: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error during login' });
    }
}

const verify = async (req, res) => {
    try {
        const { verificationCode } = req.body;
  
        // Check if the verification code matches the one stored in the session
        if ( parseInt(verificationCode) !== parseInt(req.session.verificationCode) ) {
            return res.status(401).json({ status: false, message: 'Invalid verification code' });
        }
  
        const userId = req.session.userId
  
        const user = await User.findOne({
          where: {
              id: userId
          }
        })
  
        // Clear the stored verification code
        req.session.verificationCode = null;
  
        // Store user information in the session
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        };
  
        const token = createToken(userId);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ status: true, message: 'Verification successful', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Error during verification' });
    }
}

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports = { register, login, verify, logout }