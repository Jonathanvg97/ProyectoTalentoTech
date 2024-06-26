import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/users.model";
import { validationResult } from "express-validator";

// Interfaz para los errores esperados
interface MongoError extends Error {
  code?: number;
  keyPattern?: {
    email?: any;
  };
}

// Ruta para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { body } = req;
  try {
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Crear una instancia del modelo UserModel con los datos del cuerpo de la solicitud
    const newUser = new UserModel({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role,
      // Verificar si el usuario es de tipo 'admin' para asignar el campo clientType
      clientType: body.role === "admin" ? undefined : body.clientType,
      relevantOpportunities: body.relevantOpportunities,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    res.status(200).json({
      ok: true,
      msg: "Usuario creado exitosamente",
      user: newUser,
    });
  } catch (err) {
    const error = err as MongoError;
    console.error("Error al crear el usuario:", error);

    // Verificar si el error es por un correo ya registrado
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(500).json({
        ok: false,
        msg: "Correo ya registrado",
      });
    } else {
      res.status(500).json({
        ok: false,
        msg: "Error al crear el usuario",
        error,
      });
    }
  }
};

// Ruta para Obtener un usuario by ID
export const getUserByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
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
    const users = await UserModel.find();

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

// Ruta para Actualizar un usuario by ID
export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  // Validar los resultados
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.array() });
  }

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró el usuario",
      });
    }

    // Si la contraseña está presente en el cuerpo de la solicitud
    if (body.password) {
      // Verificar que la nueva contraseña sea distinta a la anterior
      const isSamePassword = await bcrypt.compare(body.password, user.password);
      if (isSamePassword) {
        return res.status(400).json({
          ok: false,
          msg: "La nueva contraseña debe ser diferente de la anterior",
        });
      }

      // Hashear la nueva contraseña
      body.password = await bcrypt.hash(body.password, 10);
    }

    // Actualizar el usuario
    const updatedUser = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró el usuario después de la actualización",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Usuario actualizado exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error al actualizar el usuario", error });
  }
};

// Ruta para Eliminar un nuevo usuario by ID
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
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
