const express = require("express");
const _ = require('underscore');
const app = express();
const tags = require('../models/tags');

app.get('/tags', (req, res) => {
  tags.find({})
    .exec()
    .then(tags => {
      res.json({
        ok: true,
        msg: 'Tags gotten successfully',
        length: tags.length,
        data: tags
      });  
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: "Error getting tags",
        error: err
      });
    });
});

module.exports = app;
