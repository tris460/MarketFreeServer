const express = require("express");
const _ = require('underscore');
const app = express();
const User = require('../models/users'); // Importa el modelo de usuarios

app.get('/users', (req, res) => {
  User.find({})
    .populate('purchasedProducts', 'id')
    .populate('shoppingCart', 'id')
    .populate('productsForSale', 'id')
    .then(users => {
      res.json({
        ok: true,
        msg: 'Users retrieved successfully',
        length: users.length,
        data: users
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error retrieving users',
        error: err
      });
    });
});

app.post('/users', (req, res) => {
  let user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
    image: req.body.image,
    purchasedProducts: req.body.purchasedProducts,
    shoppingCart: req.body.shoppingCart,
    productsForSale: req.body.productsForSale
  });

  user.save()
    .then(savedUser => {
      res.json({
        ok: true,
        msg: 'User saved successfully',
        data: savedUser
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error saving user',
        error: err
      });
    });
});

app.put("/users/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'lastname', 'email', 'password', 'image', 'purchasedProducts', 'shoppingCart', 'productsForSale']);

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
    .then(updatedUser => {
      res.json({
        ok: true,
        msg: 'User updated successfully',
        data: updatedUser
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error updating user',
        error: err
      });
    });
});

app.delete("/users/:id", function(req, res) {
  let id = req.params.id;

  User.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true, context: 'query' })
    .then(deletedUser => {
      res.json({
        ok: true,
        msg: 'User deleted successfully',
        data: deletedUser
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error deleting user',
        error: err
      });
    });
});

module.exports = app;
