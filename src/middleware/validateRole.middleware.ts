import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
  user?: {
    role: string;
  };
}

export const validateRole = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.user?.role;

    if (!role) {
      return res.status(403).json({
        ok: false,
        msg: "El usuario no tiene un rol especificado",
      });
    }

    if (role === "admin") {

        
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "No tienes permisos para realizar esta acción",
      });
    }
  } catch (error) {
    console.error("Error al validar el rol:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error al validar el rol del usuario",
      error,
    });
  }
};
