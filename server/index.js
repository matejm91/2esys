const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const mysql = require('mysql');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Airports'
});
conn.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// cors settings
app.use(cors());
app.options('http://localhost:3000/', cors());

// GET reqs
app.get('/', (req, response) => {
  response.send('Hello World!')
});

app.get('/airports', (req, response) => {
  conn.query('SELECT * FROM airports', (err, rows) => {
    if (err) throw err;

    response.send(rows);
  });
});

app.get('/airport/:id', (req, response) => {
  conn.query(`SELECT * FROM airports WHERE id = ${req.params.id}`, (err, rows) => {
    if (err) throw err;

    response.send(rows);
  });
});

app.get('/countries', (req, response) => {
  conn.query('SELECT * FROM countries', (err, rows) => {
    if (err) throw err;

    response.send(rows);
  });
});

app.get('/country/:id', (req, response) => {
  conn.query(`SELECT * FROM countries WHERE id = ${req.params.id}`, (err, rows) => {
    if (err) throw err;

    response.send(rows);
  });
});

app.get('/airlines', (req, response) => {
  conn.query('SELECT * FROM airlines', (err, rows) => {
    if (err) throw err;

    response.send(rows);
  });
});

app.get('/airline/:id', (req, response) => {
  conn.query(`SELECT * FROM airlines WHERE id = ${req.params.id}`, (err, rows) => {
    if (err) throw err;

    response.send(rows);
  });
});

// POST reqs
app.post('/airports', (req, response) => {
  conn.query('INSERT INTO airports SET ?', req.body, (err, res) => {
    if(err) throw err;

    response.status(200).send('Airport cerated successfully!');
  });
});

app.post('/countries', (req, response) => {
  conn.query('INSERT INTO countries SET ?', req.body, (err, res) => {
    if(err) throw err;

    response.status(200).send('Country cerated successfully!');
  });
});

app.post('/airlines', (req, response) => {
  conn.query('INSERT INTO airlines SET ?', req.body, (err, res) => {
    if(err) throw err;

    response.status(200).send('Airline cerated successfully!');
  });
});

//PUT reqs
app.put('/airport/:id', (req, response) => {
  const id = parseInt(req.params.id);

  conn.query('UPDATE airports SET ? WHERE id = ?', [req.body, id], (err, res) => {
    if (err) throw err;

    response.status(200).send('Airport updated successfully!');
  });
});

app.put('/country/:id', (req, response) => {
  const id = parseInt(req.params.id);

  conn.query('UPDATE countries SET ? WHERE id = ?', [req.body, id], (err, res) => {
    if (err) throw err;

    response.status(200).send('Country updated successfully!');
  });
});

app.put('/airline/:id', (req, response) => {
  const id = parseInt(req.params.id);

  conn.query('UPDATE airlines SET ? WHERE id = ?', [req.body, id], (err, res) => {
    if (err) throw err;

    response.status(200).send('Airline updated successfully!');
  });
});

//DELETE reqs
app.delete('/airport/:id', (req, response) => {
  conn.query(
  'DELETE FROM airports WHERE id = ?', parseInt(req.params.id), (err, res) => {
    if (err) throw err;

    response.status(200).send('Airport deleted succesfully!');
  });
});

app.delete('/country/:id', (req, response) => {
  conn.query(
  'DELETE FROM countries WHERE id = ?', parseInt(req.params.id), (err, res) => {
    if (err) throw err;

    response.status(200).send('Country deleted succesfully!');
  });
});

app.delete('/airline/:id', (req, response) => {
  conn.query(
  'DELETE FROM airlines WHERE id = ?', parseInt(req.params.id), (err, res) => {
    if (err) throw err;

    response.status(200).send('Airline deleted succesfully!');
  });
});

//app listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});