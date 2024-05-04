import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/users.model";

// Ruta para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Crear una instancia del modelo User con los datos del cuerpo de la solicitud
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    res.status(200).json({
      ok: true,
      msg: "Usuario creado exitosamente",
      user: newUser,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error al crear el usuario", error });
  }
};

// Ruta para Obtener un usuario by ID
export const getUserByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro el usuario",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "usuario encontrado exitosamente",
      user,
    });
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error al buscar el usuario", error });
  }
};

// Ruta para Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      ok: true,
      msg: "usuarios encontrados exitosamente",
      users,
    });
  } catch (error) {
    console.error("Error al buscar los usuarios:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error al buscar los usuarios", error });
  }
};

// Ruta para Eliminar un nuevo usuario by ID
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro el usuario",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "usuario eliminado exitosamente",
      user,
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error al eliminar el usuario", error });
  }
};
