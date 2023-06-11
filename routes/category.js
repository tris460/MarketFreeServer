const express = require("express");
const _ = require('underscore');
const app = express();
const category = require('../models/category');

app.get('/category', (req, res) => {
  category.find({})
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: "Error getting categories",
          error: err
        });
      }

      res.json({
        ok: true,
        msg: 'Categories gotten successfully',
        length: category.length,
        data: category
      });
    });
});

module.exports = app;
