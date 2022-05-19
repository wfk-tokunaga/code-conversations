const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');

// need to create our connection to the mysql server
const app = express();
const PORT = process.env.PORT || 3007;

//Setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect the express server 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});