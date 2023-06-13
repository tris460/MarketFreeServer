const express = require("express");
const _ = require('underscore');
const app = express();
const products = require('../models/products');

app.get('/products', (req, res) => {
  products.find({})
    .populate('promotion', 'name')
    .populate('tags', 'name')
    .populate('category', 'name')
    .populate('user', 'id')
    .exec()
    .then(products => {
      res.json({
        ok: true,
        msg: 'Products gotten successfully',
        length: products.length,
        data: products
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error getting the products',
        error: err
      });
    });
});

app.post('/products', (req, res) => {
  let product = new products({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    discount: req.body.discount,
    image: req.body.image,
    quantity: req.body.quantity,
    publishedDay: req.body.publishedDay, //TODO: Get date dynamically
    status: req.body.status,
    review: req.body.review,
    promotion: req.body.promotion,
    tags: req.body.tags,
    category: req.body.category,
    user: req.body.user
  });

  product.save((err, product) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Error saving product',
        error: err
      });
    }

    res.json({
      ok: true,
      msg: 'Product saved successfully',
      data: product
    });
  });
});

app.put("/product/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'price', 'description', 'discount', 'image', 'quantity', 'publishedDay', 
                    'status', 'review', 'promotion', 'tags', 'category', 'user']);

  products.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, product) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Error updating product',
        error: err
      });
    }

    res.json({
      ok: true,
      msg: 'Product updated successfully',
      data: product
    })
  });
});

app.delete("/product/:id", function(req, res) {
  let id = req.params.id;

  products.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true, context: 'query' }, (err, product) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Error deleting product',
        error: err
      });
    }

    res.json({
      ok: true,
      msg: 'Product deleted successfully',
      data: product
    });
  })
});

module.exports = app;
