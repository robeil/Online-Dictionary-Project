const express = require('express');
const path = require('path');
//const word = require('./db/word');
const app = express();
const bodyParser = require('body-parser');


//port
const port = 2023

//middleware
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//homepage routes
app.get("/", (req, res) => { 
    res.sendFile(path.join(__dirname, './public/dict.html'));
});
//this will appear when the searched word came back
app.get("/searchWord", (req, res) => {
   searchedWord(req,res);
});

//listening the port here
app.listen(port, () => {
  console.log(`Server connecting on port ${port}`);
})

/******************************************************************* */
const searchedWord = async function (req, res) {
  //getting 
  let word = req.query.term.trim();

  const mysql = require("mysql");
  // connection to the Database
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "robeilaregawi",
    database: "entries",
  });
  connection.connect();
  connection.query(
    "SELECT * FROM entries.entries where word = '" + word +"'",
    (err, rows, fields) => {
      if (err) throw err;
      res.json(Object.values(JSON.parse(JSON.stringify(rows))));
    }
  );
  connection.end(req, res);
};
