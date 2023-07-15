const express = require("express");
const _ = require('underscore');
const app = express();
const Product = require('../models/products'); // Importa el modelo de productos

app.get('/products', (req, res) => {
  Product.find({})
    .populate('promotion', 'name')
    .populate('tags', 'name')
    .populate('category', 'name')
    .populate('user', 'id')
    .then(products => {
      res.json({
        ok: true,
        msg: 'Products retrieved successfully',
        length: products.length,
        data: products
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error retrieving products',
        error: err
      });
    });
});

app.post('/products', (req, res) => {
  let product = new Product({
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

  product.save()
    .then(savedProduct => {
      res.json({
        ok: true,
        msg: 'Product saved successfully',
        data: savedProduct
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error saving product',
        error: err
      });
    });
});

app.put("/products/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'price', 'description', 'discount', 'image', 'quantity', 'publishedDay', 'status', 'review', 'promotion', 'tags', 'category', 'user']);

  Product.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
    .then(updatedProduct => {
      res.json({
        ok: true,
        msg: 'Product updated successfully',
        data: updatedProduct
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error updating product',
        error: err
      });
    });
});

app.delete("/products/:id", function(req, res) {
  let id = req.params.id;

  Product.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true, context: 'query' })
    .then(deletedProduct => {
      res.json({
        ok: true,
        msg: 'Product deleted successfully',
        data: deletedProduct
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error deleting product',
        error: err
      });
    });
});

module.exports = app;
