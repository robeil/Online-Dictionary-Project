

var searchedWord = async function (req, res) {

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
        //"SELECT * FROM entries.entries where word = '" + req.body.term + "'" + req.query.term.trim() + "'",
        "SELECT * FROM entries",
        (err, rows, fields) => {
            if (err) {
                throw err;
            } else {
                res.json(Object.values(JSON.parse(JSON.stringify(rows))));
            }
        }
    );
    connection.end(req, res);
};

module.exports = searchedWord;