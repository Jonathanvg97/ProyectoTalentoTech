import { Request, Response } from "express";
import NotificationMatchModel from "../models/notificationMatch.model";
import UserModel from "../models/users.model";
import { CustomRequest } from "../middleware/validateRole.middleware";
import MatchModel from "../models/match.model";

// Función para obtener todas las notificaciones de un usuario
export const getAllUserNotifications = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const userId = req.params.userId; // Obtener el ID del usuario de los parámetros de la solicitud

    // Verificar si el usuario existe en la base de datos
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener el usuario desde el token JWT
    const userFromToken = req.user?.role;

    // Definir el filtro para obtener las notificaciones según el rol del usuario
    let filter: any = { userId };
    if (userFromToken === "admin") {
      filter = { adminId: userId };
    }
 
   // Obtener todas las notificaciones del usuario
   const notifications = await NotificationMatchModel.find(filter);

    // Verificar si hay notificaciones
    if (notifications.length === 0) {
      return res.status(404).json({ message: "No hay notificaciones para este usuario" });
    }

   // Filtrar y transformar las notificaciones según el rol del usuario
   const filteredNotifications = notifications.map((notification) => {
     // Si el usuario es un administrador, mostrar solo el mensaje de administrador
     if (userFromToken === "admin") {
       return {
         _id: notification._id,
         userId: notification.userId,
         adminId: notification.adminId,
         businessId: notification.businessId,
         userMessages: {
           admin: notification.userMessages.admin,
         },
         status: notification.status,
         acceptedByUser: notification.acceptedByUser,
         acceptedByAdmin: notification.acceptedByAdmin,
       };
     } else {
       // Si el usuario es un usuario normal, mostrar solo el mensaje de usuario
       return {
         _id: notification._id,
         userId: notification.userId,
         userMessages: {
           user: notification.userMessages.user,
         },
         status: notification.status,
         acceptedByUser: notification.acceptedByUser,
         acceptedByAdmin: notification.acceptedByAdmin,
       };
     }
   });

   return res.status(200).json({ notifications: filteredNotifications });
 } catch (error) {
   console.error("Error al obtener las notificaciones del usuario:", error);
   return res.status(500).json({
     message:
       "Error interno del servidor al obtener las notificaciones del usuario",
   });
 }
};

// Función para aceptar una notificación por el usuario
export const acceptNotificationByUser = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const notificationId = req.params.notificationId;
    const userId = req.user?._id;

    const notification = await NotificationMatchModel.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }
    if (notification.userId.toString() !== userId?.toString()) {
      return res.status(403).json({
        message: "Acceso denegado. No puedes aceptar esta notificación",
      });
    }
    // Verificar si la notificación ha sido cancelada previamente
    if (notification.status === "cancelled") {
      return res.status(400).json({
        message: "La notificación ha sido cancelada previamente",
      });
    }

    if (notification.status === "accepted") {
      return res.status(400).json({
        message: "La notificación ya ha sido aceptada por el usuario",
      });
    }

    // Marcar la notificación como aceptada por el usuario
    notification.acceptedByUser = true;
    let matchUpdate = { user: { response: "accepted" } };

    // Si también ha sido aceptada por el administrador, cambiar el estado de la notificación a "aceptado"
    if (notification.acceptedByAdmin) {
      notification.status = "accepted";
      matchUpdate = { user: { response: "accepted" } };
    }

    await notification.save();
    // Actualizar el estado correspondiente en el modelo Match
    await MatchModel.updateOne(
      { "user.userId": notification.userId },
      { "user.response": "accepted" }
    );

    return res
      .status(200)
      .json({ message: "Notificación aceptada por el usuario" });
  } catch (error) {
    console.error("Error al aceptar la notificación por el usuario:", error);
    return res.status(500).json({
      message:
        "Error interno del servidor al aceptar la notificación por el usuario",
    });
  }
};

// Función para aceptar una notificación por el administrador
export const acceptNotificationByAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const notificationId = req.params.notificationId;

    const notification = await NotificationMatchModel.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    // Verificar si la notificación ha sido cancelada previamente
    if (notification.status === "cancelled") {
      return res.status(400).json({
        message: "La notificación ha sido cancelada previamente",
      });
    }
    // Verificar si la notificación ya ha sido aceptada por el administrador
    if (notification.acceptedByAdmin) {
      return res.status(400).json({
        message: "La notificación ya ha sido aceptada por el administrador",
      });
    }

    // Marcar la notificación como aceptada por el administrador
    notification.acceptedByAdmin = true;
    let matchUpdate = { business: { response: "accepted" } };

    // Si también ha sido aceptada por el usuario, cambiar el estado de la notificación a "aceptado"
    if (notification.acceptedByUser) {
      notification.status = "accepted";
      matchUpdate = { business: { response: "accepted" } };
    }

    await notification.save();

    // Actualizar el estado correspondiente en el modelo Match
    await MatchModel.updateOne(
      { "business.businessId": notification.businessId },
      { "business.response": "accepted" }
    );

    return res
      .status(200)
      .json({ message: "Notificación aceptada por el administrador" });
  } catch (error) {
    console.error(
      "Error al aceptar la notificación por el administrador:",
      error
    );
    return res.status(500).json({
      message:
        "Error interno del servidor al aceptar la notificación por el administrador",
    });
  }
};

// Función para cancelar una notificación por el usuario
export const cancelNotificationByUser = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const notificationId = req.params.notificationId;
    const userId = req.user?._id;

    const notification = await NotificationMatchModel.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    if (notification.userId.toString() !== userId?.toString()) {
      return res.status(403).json({
        message: "Acceso denegado. No puedes cancelar esta notificación",
      });
    }

    if (notification.acceptedByUser) {
      return res.status(400).json({
        message: "La notificación ya ha sido aceptada por el usuario",
      });
    }

    // Verificar si la notificación ha sido cancelada previamente
    if (notification.status === "cancelled") {
      return res.status(400).json({
        message: "La notificación ha sido cancelada previamente",
      });
    }

    // Cambiar el estado de la notificación a "cancelled"
    notification.status = "cancelled";
    await notification.save();

    // Actualizar el estado correspondiente en el modelo Match
    await MatchModel.updateOne(
      {
        "user.userId": notification.userId,
        "business.businessId": notification.businessId,
      },
      { "user.response": "cancelled", "business.response": "cancelled" }
    );

    return res
      .status(200)
      .json({ message: "Notificación cancelada por el usuario" });
  } catch (error) {
    console.error("Error al cancelar la notificación por el usuario:", error);
    return res.status(500).json({
      message:
        "Error interno del servidor al cancelar la notificación por el usuario",
    });
  }
};

// Función para cancelar una notificación por el administrador
export const cancelNotificationByAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const notificationId = req.params.notificationId;

    const notification = await NotificationMatchModel.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }
    // Verificar si la notificación ha sido aceptada por el administrador
    if (notification.acceptedByAdmin) {
      return res.status(400).json({
        message: "La notificación ya ha sido aceptada por el administrador",
      });
    }

    if (notification.status === "cancelled") {
      return res.status(400).json({
        message: "La notificación ha sido cancelada previamente",
      });
    }

    // Cambiar el estado de la notificación a "cancelled"
    notification.status = "cancelled";
    await notification.save();

    // Actualizar el estado correspondiente en el modelo Match
    const adminUser = await UserModel.findById(notification.adminId);
    if (!adminUser) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    await MatchModel.updateOne(
      {
        "user.userId": notification.userId,
        "business.businessId": notification.businessId,
      },
      { "user.response": "cancelled", "business.response": "cancelled" }
    );

    return res
      .status(200)
      .json({ message: "Notificación cancelada por el administrador" });
  } catch (error) {
    console.error(
      "Error al cancelar la notificación por el administrador:",
      error
    );
    return res.status(500).json({
      message:
        "Error interno del servidor al cancelar la notificación por el administrador",
    });
  }
};
