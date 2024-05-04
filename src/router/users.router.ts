import express, { Request, Response } from "express";
import User from "../models/users.model";

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/userCreate", async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body); // Crear una instancia del modelo User con los datos del cuerpo de la solicitud
    await newUser.save(); // Guardar el nuevo usuario en la base de datos
    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
});
export default router;
