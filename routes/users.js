const express = require("express");
const _ = require('underscore');
const app = express();
const users = require('../models/users');

app.get('/users', (req, res) => {
  users.find({})
    .populate('purchasedProducts', 'id')
    .populate('shoppingCart', 'id')
    .populate('productsForSale', 'id')
    .exec()
    .then(users => {
      res.json({
        ok: true,
        msg: 'Users gotten successfully',
        length: users.length,
        data: users
      });  
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error getting the users',
        error: err
      });
    });
});

app.post('/users', (req, res) => {
  let user = new users({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image,
    purchasedProducts: req.body.purchasedProducts,
    shoppingCart: req.body.shoppingCart,
    productsForSale: req.body.productsForSale
  });

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Error saving user',
        error: err
      });
    }

    res.json({
      ok: true,
      msg: 'User saved successfully',
      data: user
    });
  });
});

app.put("/users/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'lastname', 'email', 'password', 'image', 'purchasedProducts', 'shoppingCart', 'productsForSale']);

  users.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Error updating user',
        error: err
      });
    }

    res.json({
      ok: true,
      msg: 'User updated successfully',
      data: user
    })
  });
});

app.delete("/users/:id", function(req, res) {
  let id = req.params.id;

  users.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true, context: 'query' }, (err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Error deleting user',
        error: err
      });
    }

    res.json({
      ok: true,
      msg: 'User deleted successfully',
      data: user
    });
  })
});

module.exports = app;
