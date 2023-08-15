const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const authRoutes = require('./app/routes/authRoutes');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./app/middleware/authMiddleware');
const options = require('./swaggerOptions');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'app', 'views'));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: process.env.AUTH_SECRETE,
    resave: false,
    saveUninitialized: true
}));

// Use the routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use('/auth', authRoutes);


// Initialize Swagger
const swaggerSpec = swaggerJSDoc(options);

// Serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
