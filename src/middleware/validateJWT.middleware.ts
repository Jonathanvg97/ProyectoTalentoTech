import { NextFunction, Request, Response } from "express";
import RevokedTokenModel from "../models/revokedTokenModel.model";

const jwt = require("jsonwebtoken");

export interface CustomRequest extends Request {
  _id?: number;
  role?: string;
  user?: any;
  name?: string;
}

export const validateJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición, debes proporcionar un token",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // Verificar si el token está revocado
    const revokedToken = await RevokedTokenModel.findOne({ token });
    if (revokedToken) {
      return res.status(401).json({
        ok: false,
        msg: "Token revocado",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken; // Almacena la información del usuario en req.user

    console.log("Usuario autenticado:", decodedToken.role);
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token Invalido",
    });
  }
};

export const validateJWTPass = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("x-token-pass");

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_PASS);
    req._id = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token Invalido",
    });
  }
};
