import { Request, Response } from "express";
import NotificationMatchModel from "../models/notificationMatch.model";
import UserModel from "../models/users.model";

// Función para obtener todas las notificaciones de un usuario
export const getAllUserNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // Obtener el ID del usuario de los parámetros de la solicitud

    // Verificar si el usuario existe en la base de datos
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener todas las notificaciones del usuario
    const notifications = await NotificationMatchModel.find({ userId });

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error al obtener las notificaciones del usuario:", error);
    return res
      .status(500)
      .json({
        message:
          "Error interno del servidor al obtener las notificaciones del usuario",
      });
  }
};

// Función para cambiar el estado de una notificación
export const updateNotificationStatus = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.notificationId; // Obtener el ID de la notificación de los parámetros de la solicitud
    const { status } = req.body; // Obtener el nuevo estado de la notificación del cuerpo de la solicitud

    // Verificar si la notificación existe en la base de datos
    const notification = await NotificationMatchModel.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    // Actualizar el estado de la notificación
    notification.status = status;

    // Guardar los cambios en la base de datos
    await notification.save();

    return res
      .status(200)
      .json({
        message: "Estado de la notificación actualizado correctamente",
        notification,
      });
  } catch (error) {
    console.error("Error al actualizar el estado de la notificación:", error);
    return res
      .status(500)
      .json({
        message:
          "Error interno del servidor al actualizar el estado de la notificación",
      });
  }
};
