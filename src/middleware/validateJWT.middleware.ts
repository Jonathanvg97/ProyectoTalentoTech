import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export interface CustomRequest extends Request {
  _id?: number;
  role?: string;
  user?: any;
}

export const validateJWT = (
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
  const token = req.header("x-token-pass");
  console.log(token);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_PASS);
    req._id = _id;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token Invalido",
    });
  }
};
