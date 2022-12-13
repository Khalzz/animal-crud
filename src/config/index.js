require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

mongoose.set('strictQuery', true); // for some reason mongoose need this now (study why)
mongoose.connect(process.env.DB);

app.use(express.json()); // remember asshole you have to transform every request on json
app.use('', require('../routes/routes'));
app.use(express.static(path.join(__dirname, '../public'))); // to define public files on other folders we do like this


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', '404.html'));
})

app.listen(port, ()=>{
    console.log('The web is working on: http://localhost:' + port);
})