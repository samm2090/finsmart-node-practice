const express = require('express');
const connection = require('../database');
const tokenVerification = require('../security/tokenVerification');

const router = express.Router();

router.get('/clients', (req, res) => {
  connection.query('select * from client', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/client/:id', (req, res) => {
  const {
    id
  } = req.params;
  connection.query('select * from client where id=?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

router.post('/client', (req, res) => {
  const {
    name,
    lastName
  } = req.body;

  const query = `
    insert into client(name, last_name) values(?, ?);
  `;

  // const query = `
  //   CALL createClientOrEdit(?, ?, ?);
  // `;

  connection.query(query, [name, lastName], (err, rows, fields) => {
    if (!err) {
      res.json({
        status: 'New client saved'
      });
    } else {
      console.log(err);
    }
  });
});

router.put('/client/:id', (req, res) => {
  const {
    name,
    lastName
  } = req.body;

  const {
    id
  } = req.params;

  const query = `CALL createClientOrEdit(?,?,?)`;

  connection.query(query, [id, name, lastName], (err, rows, fields) => {
    if (!err) {
      res.json({
        status: 'Client updated'
      });
    } else {
      console.log(err);
    }
  })

});

router.delete('/client/:id', (req, res) => {
  const query = `delete from client where id=?`;

  const {
    id
  } = req.params;

  connection.query(query, [id], (err, rows, filds) => {
    if (!err) {
      res.json({
        status: 'Client deleted'
      });
    } else {
      console.log(err);
    }
  });
});


module.exports = router;
