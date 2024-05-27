import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
  user?: {
    role: string;
    _id: number;
    name: string;
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
        msg: "Rol de usuario no especificado en el token",
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
    console.error("Error al validar el rol del usuario", error);
    return res.status(500).json({
      ok: false,
      msg: "Error al validar el rol del usuario",
      error,
    });
  }
};
