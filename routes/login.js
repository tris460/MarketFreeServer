const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("../models/users");

// Ruta para el inicio de sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar al usuario en la base de datos por su correo electrónico
    const users = await User.findOne({ email:email });
    console.log(users)
    // Si el usuario no existe, o la contraseña es incorrecta, retornar un mensaje de error
    if (!users || password !=users.password) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Si las credenciales son válidas, generar el token de acceso
    const accessToken = jwt.sign(
      { userId: users._id, email: users.email },
      "clave-secreta-del-token", // Reemplaza esto con una clave secreta segura
      { expiresIn: "1h" } // El token expirará en 1 hora
    );

    // Retornar el token de acceso al cliente
    res.status(200).json({ data: users });
  } catch (error) {
    // Si ocurre un error en el servidor, retornar un mensaje de error
    console.error("Error al intentar iniciar sesión:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = app;