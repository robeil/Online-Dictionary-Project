const express = require("express");
const path = require('path');
const word = require('./db/word');
const app = express();
const bodyParser = require('body-parser');

//port
const port = 2023

//middleware
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

//homepage routes
app.get("/", (req, res) => { 
    res.sendFile(path.join(__dirname, './public/dict.html'));
});
//this will appear when the searched word came back
app.get("/searchingWord", (req, res) => {
   word(req, res);
});

//listening the port here
app.listen(port, () => {
  console.log(`Server connecting on port ${port}`);
})
