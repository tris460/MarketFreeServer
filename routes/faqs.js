const express = require("express");
const _ = require('underscore');
const app = express();
const faqs = require('../models/faqs');

app.get('/faqs', (req, res) => {
  faqs.find({})
    .populate('category', 'name')
    .exec()
    .then(faqs => {
      res.json({
        ok: true,
        msg: 'FAQs gotten successfully',
        length: faqs.length,
        data: faqs
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: "Error getting FAQs",
        error: err
      });
    });
});

module.exports = app;
