const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const app = express();
const User = require("../models/users");

// Ruta para el inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por su correo electrónico
    const user = await User.findOne({ email });

    // Si el usuario no existe, o la contraseña es incorrecta, retornar un mensaje de error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Si las credenciales son válidas, generar el token de acceso
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      "clave-secreta-del-token", // Reemplaza esto con una clave secreta segura
      { expiresIn: "1h" } // El token expirará en 1 hora
    );

    // Retornar el token de acceso al cliente
    res.json({ accessToken });
  } catch (error) {
    // Si ocurre un error en el servidor, retornar un mensaje de error
    console.error("Error al intentar iniciar sesión:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = app;