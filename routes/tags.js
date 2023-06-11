const express = require("express");
const _ = require('underscore');
const app = express();
const tags = require('../models/tags');

app.get('/tags', (req, res) => {
  tags.find({})
    .exec((err, tags) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: "Error getting tags",
          error: err
        });
      }

      res.json({
        ok: true,
        msg: 'Tags gotten successfully',
        length: tags.length,
        data: tags
      });
    });
});

module.exports = app;
