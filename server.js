const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name,email,password,authorization, login, status) VALUES (?)";
    let date = new Date().toLocaleString('ru-RU');
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        date,
        date,
        'Active'
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json('Error');
        }
        return res.json(data);
    })
})

let updateDate = function (req, res, next) {
    let date = new Date().toLocaleString('ru-RU');
    const sql = "UPDATE login SET login = ? WHERE email = ? AND password = ?";
    db.query(sql, [date, req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.log(err);
            return res.json('Error');
        }
        next();
    })
}

app.use(updateDate);

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.log(err);
            return res.json('Error');
        }
        else if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    })
})

app.get('/', (req, res) => {
    const sql = "SELECT id,name,email,password,authorization,login,status FROM login";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    })
})

app.listen(8081, () => {
    console.log("listening");
})