const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const connection = require('../database');

router.post('/user', async (req, res) => {
  const {
    username,
    password
  } = req.body;

  const query = `insert into user(username, password) values (?,?)`;

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  const params = [username, hashpassword];

  connection.query(query, params, (err, rows, fields) => {
    if (!err) {
      res.json({
        status: 'User created'
      });
    } else {
      console.log(err);
    }
  })
});

router.post('/user/login', async (req, res) => {
  const {
    username,
    password
  } = req.body;

  const params = [username];
  const query = `select * from user where username =?`;

  connection.query(query, params, async (err, rows, fields) => {
    if (!err) {
      let user = rows[0];

      const validUser = await bcrypt.compare(password, user.password);

      if (validUser) {

        const token = await jwt.sign({
          _id: user.id
        }, 'my_key');
        res.header('auth-token', token, {expiresIn: 3600000}).send(token);

      } else {
        res.status(400).json({
          status: 'Incorrect credentials'
        });
      }
    } else {
      console.log(err);
    }
  });

});


module.exports = router;
