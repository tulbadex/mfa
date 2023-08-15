const express = require('express');
const auth = require('../controllers/auth/auth')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();


/**
 * Render registration form.
 */
router.get('/register', authMiddleware.redirectAfterLogin, (req, res) => {
  res.render('register');
})

/**
 * Render login form.
 */
router.get('/login', authMiddleware.redirectAfterLogin, (req, res) => {
  res.render('login');
})

/**
 * Render verification form.
 */
router.get('/verify', authMiddleware.redirectAfterLogin, (req, res) => {
  const code = req.session.verificationCode
  if (code) {
    res.render('code');
  } else {
    res.redirect('/auth/login');
  }
})

/**
 * Render Dashboard page.
 */
/**
 * @swagger
 * /auth/dashboard:
 *   get:
 *     summary: Dashboard page
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/dashboard', authMiddleware.requireAuth, (req, res) => {
  const user = req.session.user;

  if (!user) {
      // User is not authenticated, redirect to login
      return res.redirect('/auth/login');
  }
  // Render the dashboard page and pass user data
  res.render('dashboard', { user });
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/logout', authMiddleware.requireAuth, auth.logout);


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 * *             lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       401:
 *         description: Username or email already exists
 *       500:
 *         description: Error registering user
 */
router.post('/register', authMiddleware.redirectAfterLogin, auth.register);

/**
 * @swagger
 * path:
 *    /auth/login:
    *   post:
    *     summary: Login a user
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               username:
    *                 type: string
    *               password:
    *                 type: string
    *             required:
    *               - username
    *               - password
    *     responses:
    *       200:
    *         description: Verification code sent successfully
    *       401:
    *         description: Invalid credentials
    *       500:
    *         description: Error during login
 */
router.post('/login', authMiddleware.redirectAfterLogin, auth.login);

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Verify user's MFA code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verificationCode:
 *                 type: string
 *             required:
 *               - verificationCode
 *     responses:
 *       200:
 *         description: Verification code sent successfully
 *       401:
 *         description: Invalid verification code
 *       500:
 *         description: Error during verification
 */
router.post('/verify', authMiddleware.redirectAfterLogin, auth.verify);

module.exports = router;