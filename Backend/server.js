// Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');

// Creating an instance of the express application
// Serves as backbone of our server
const app = express();

// Uses Sequelize ORM to connect to MySQL database
// Abstracts db operations into JavaScript objects
// Example query would be: db.User.findAll()
const db = require('./models');

// Middleware functions to serve static files
// Handles client-like assets like images, CSS, and JS
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cors()); // Web security feature to prevent cross-origin requests
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json()); // Parses JSON data from incoming HTTP requests

// Import and use routes 
const headacheRoutes = require('./routes/headache');
// Uses routes - makes sure  headacheRoutes is a router object
// Prefixing all headache routes with '/api'
app.use('/api', headacheRoutes);  


// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: err.message 
    });
});


// Backend Port can be any number
// Where Express Server runs & shld be diff from Frontend port
// Handles API requests from the client
const PORT = process.env.PORT || 8080;


//Routes
app.get('/select', (req, res) => {
    res.send('select');
  }); 

app.get('/insert', (req, res) => {
    res.send('insert');
  }); 

app.get('/delete', (req, res) => {
    res.send('delete');
});

app.get('/', (req, res) => {
    res.send("Welcome to the backend server!");
});

// Will print out all registered routes when starting the server.
// Useful for debugging purposes.
app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log(r.route.path)
    }
});

/*
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
*/

// Database connection and server start
db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('Database synced and tables created');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

