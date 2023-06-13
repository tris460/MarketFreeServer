const express = require("express");
const _ = require('underscore');
const app = express();
const benefits = require('../models/benefits');

app.get('/benefits', (req, res) => {
  benefits.find({})
    .exec()
    .then(benefits => {
      res.json({
        ok: true,
        msg: 'Benefits gotten successfully',
        length: benefits.length,
        data: benefits
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: "Error getting benefits",
        error: err
      });        
    });
});

module.exports = app;
