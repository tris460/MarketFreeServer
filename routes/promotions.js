const express = require("express");
const _ = require('underscore');
const app = express();
const promotions = require('../models/promotions');

app.get('/promotions', (req, res) => {
  promotions.find({})
    .exec()
    .then(promotions => {
      res.json({
        ok: true,
        msg: 'Promotions gotten successfully',
        length: promotions.length,
        data: promotions
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: "Error getting promotions",
        error: err
      });
    });
});

module.exports = app;
