// 1. Solicitar datos email y contraseña
// 2. Validar Contraseña
// 3. Generar el Token
// 4. Login Exitoso

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "../models/users.model";
import generateJWT from "../middleware/auth.middleware";

export const authenticateLogin = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    // Verificar el email
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son válidas",
      });
    }

    //Verificar el password
    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son válidas",
      });
    }

    // Verificar los roles solo si el token se decodifica correctamente
    const validateRole = user.role ;
    if (validateRole !== "admin" && validateRole !== "user") {
      return res.status(403).json({
        ok: false,
        msg: "Rol de usuario no permitido",
      });
    }

    // Generar Token
    const token = await generateJWT(user._id, user.email, user.role);

    res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al iniciar sesión",
    });
    res.status(404).json({
      ok: false,
      error,
      msg: "Error al iniciar sesión",
    });
    res.status(500).json({
      ok: false,
      error,
      msg: "Error del servior , error al iniciar sesión",
    });
  }
};
