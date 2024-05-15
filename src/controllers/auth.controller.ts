// 1. Solicitar datos email y contraseña
// 2. Validar Contraseña
// 3. Generar el Token
// 4. Login Exitoso

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "../models/users.model";
import generateJWT from "../middleware/auth.middleware";
import { CustomRequest } from "../middleware/validateJWT.middleware";
import sendEmail from "../helpers/email";
import path from "path";
import fs from "fs";

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
    const validateRole = user.role;
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

export const forgetPassword = async (req: Request, resp: Response) => {
  const { email, role } = req.body;

  try {
    const existeUsuario = await UserModel.findOne({ email, });

    if (!existeUsuario) {
      return resp.status(400).json({
        ok: false,
        msg: "El correo no existe",
      });
    }

    const id = existeUsuario._id;

    if (id) {
      const token = await generateJWT(id, email, existeUsuario.role, "1h", process.env.JWT_SECRET_PASS);

      existeUsuario.token = token as string;
      await existeUsuario.save();

      const name = existeUsuario.name;

      const templatePath = path.join(
        __dirname,
        "../templates/forgetPassword.html"
      );
      const emailTemplate = fs.readFileSync(templatePath, "utf8");

      const personalizarEmail = emailTemplate
        .replace("{{name}}", name)
        .replace("{{token}}", token as string);

      sendEmail(
        "naboko1367@godsigma.com",
        "Cambio de contraseña",
        personalizarEmail
      );

      return resp.status(200).json({
        ok: true,
        msg: "Proceso éxitoso",
        usuario: existeUsuario,
      });
    }
  } catch (error) {
    console.error(error);
    return resp.status(400).json({
      ok: false,
      msg: "No se logró validar sus datos",
    });
  }
};

export const passwordChange = async (req: CustomRequest, res: Response) => {
  const id = req._id;
  const { password } = req.body;
  const tokenPass = req.header("x-token-pass") as string;

  try {
    if (!password || !tokenPass) {
      return res.status(400).json({
        ok: false,
        msg: "Valores invalidos",
      });
    }

    const usuario = await UserModel.findOne({ token: tokenPass });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El token ya fue utilizado",
      });
    }

    const newPassword = bcrypt.hashSync(password, 10);

    const actualizarPassword = await UserModel.findByIdAndUpdate(
      id,
      {
        password: newPassword,
        token: "",
      },
      { new: true }
    );

    if (!actualizarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Error al actualizar la contraseña",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Contraseña actualizada",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      ok: false,
      msg: "Error al actualizar la contraseña, hable con el administrador",
    });
  }
};
