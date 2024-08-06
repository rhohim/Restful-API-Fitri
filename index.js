const express = require('express')
require('dotenv').config()
const cors = require("cors");
const app = express()
const bodyparser = require('body-parser')
const port = process.env.PORT

const path = require('path');

app.use(express.json());
app.use(cors());
app.use(bodyparser.json())
const middleAuth = require('./config/middleware')

//call route
const giftRoute = require("./routers/gift")


app.use('/lebaran/gift',middleAuth, giftRoute)

// Serve static files from the public directory
// app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // res.send('Welcom to the jungle!');
  });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});