const express = require("express");
const _ = require('underscore');
const app = express();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const Product = require('../models/products')

app.put('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por correo electrónico
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Si las credenciales son válidas, el inicio de sesión es exitoso
    return res.status(200).json({ message: 'Inicio de sesión exitoso', data: user });
  } catch (err) {
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});




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

app.get('/users/products-in-cart/:id', async ( req,res ) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // const shoppingCartProducts = user.shoppingCart;
    const shoppingCartProducts = await Product.find({ _id: { $in: user.shoppingCart } });

    if(!shoppingCartProducts){
      return res.status(400).json({
        msg:"there aren't products here"
      })
    }

    return res.status(200).json({
      shoppingCartProducts
    });
  } catch (error) {
    console.log("Something went wrong with te products in the shopping cart: ",error.message)
  }
})

app.post('/users/:id/add-to-cart', async(req, res)=>{
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const user = await User.findById(id);

    if(!user){
      return res.status(404).json({
        ok:false,
        message:"user not found"
      });
    }

    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({
        ok:false,
        message:"product not found"
      });
    }

    user.shoppingCart.push(productId)
    await user.save()

    return res.status(200).json({
      ok:true,
      msg:"added to cart"
    })

  } catch (error) {
    console.log("Something went wrong add to cart",error.message);
    return res.status(500).json({
      ok:false,
      error:error.message,
    })
  }
});

app.put("/users/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'lastname', 'email', 'password', 'image', 'address', 'purchasedProducts', 'shoppingCart', 'productsForSale']);

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

//Cart
app.get('/users/products-in-cart/:id', async ( req,res ) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // const shoppingCartProducts = user.shoppingCart;
    const shoppingCartProducts = await Product.find({ _id: { $in: user.shoppingCart } });

    if(!shoppingCartProducts){
      return res.status(400).json({
        msg:"there aren't products here"
      })
    }

    return res.status(200).json({
      shoppingCartProducts
    });
  } catch (error) {
    console.log("Something went wrong with te products in the shopping cart: ",error.message)
  }
})

app.post('/users/:id/add-to-cart', async(req, res)=>{
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const user = await User.findById(id);

    if(!user){
      return res.status(404).json({
        ok:false,
        message:"user not found"
      });
    }

    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({
        ok:false,
        message:"product not found"
      });
    }

    user.shoppingCart.push(productId)
    await user.save()

    return res.status(200).json({
      ok:true,
      msg:"added to cart"
    })

  } catch (error) {
    console.log("Something went wrong add to cart",error.message);
    return res.status(500).json({
      ok:false,
      error:error.message,
    })
  }
});

app.patch('/users/:id/delete-from-cart', async (req, res) => {
    try {
      const { id } = req.params;
      const { productId } = req.body;
      
      const user = await User.findById(id);

    if(!user){
      return res.status(404).json({
        ok:false,
        message:"user not found"
      });
    }

    // Buscar el índice del producto en el carrito del usuario
    const productIndex = user.shoppingCart.indexOf(productId);

    if (productIndex === -1) {
      return res.status(404).json({
        ok: false,
        message: "Product not found in the shopping cart"
      });
    }

    // Eliminar el producto del carrito
    user.shoppingCart.splice(productIndex, 1);
    await user.save();

    return res.status(200).json({
      ok: true,
      user,
      msg: "Product removed from cart"
    });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        ok:false,
        error:error.message,
      })
    }
})

module.exports = app;
