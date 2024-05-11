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
    // const { _id, role } = jwt.verify(token, process.env.JWT_SECRET);
    // req._id = _id;
    // req.role = role;

    // if (!role) {
    //   return res.status(401).json({
    //     error: "Rol de usuario no especificado en el token",
    //     message: "El token no contiene información de rol de usuario.",
    //   });
    // }

    // console.log("Usuario autenticado con el rol:", role);

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
