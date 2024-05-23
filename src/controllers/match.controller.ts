import { Request, Response } from "express";
import UserModel from "../models/users.model";
import MatchModel from "../models/match.model";
import businessOpportunityModel from "../models/businessOpportunity.model";
import NotificationMatchModel from "../models/notificationMatch.model";

export const createMatch = async (req: Request, res: Response) => {
  try {
    // Obtener el ID del usuario y el ID de la oportunidad de negocio del cuerpo de la solicitud
    const { userId, businessId } = req.body;
    // Buscar el usuario y la oportunidad de negocio en la base de datos
    const user = await UserModel.findById(userId);
    const business = await businessOpportunityModel.findById(businessId);

    if (!user || !business) {
      return res
        .status(404)
        .json({ message: "Usuario o oportunidad de negocio no encontrados" });
    }

    // Verificar si el usuario ya hizo match con esta oportunidad de negocio
    const existingMatch = await MatchModel.findOne({
      user: userId,
      business: businessId,
    });

    if (existingMatch) {
      return res
        .status(409)
        .json({ message: "El usuario ya hizo match con esta oportunidad" });
    }

    // Verificar si el tipo de cliente del usuario coincide con el tipo de industria de la oportunidad de negocio
    if (user.clientType === business.industry) {
      // Crear un nuevo match si el match es exitoso
      const newMatch = new MatchModel({
        user: {
          userId: userId,
          userName: user.name,
          clientType: user.clientType,
        },
        business: {
          businessId: businessId,
          businessName: business.title,
          businessType: business.industry,
        },
      });

      // Guardar el nuevo match en la base de datos
      await newMatch.save();

      // Agregar el ID del match al array de matches del usuario
      user.matches.push(newMatch._id);

      // Crear notificación para el usuario
      const userNotificationMessage = `"${user.name}", Tienes un nuevo match con la oportunidad "${business.title}", ¿deseas aceptarlo?`;
      const userNotification = new NotificationMatchModel({
        userId: userId,
        message: userNotificationMessage,
        status: "pending",
      });
      await userNotification.save();
      user.notificationsMatch.notificationsMatchId.push(userNotification._id);
      user.notificationsMatch.statusMatch.push(userNotification.status);

      // Encontrar y notificar al administrador
      const adminUser = await UserModel.findById(business.createdBy.userId);
      if (adminUser) {
        const adminNotificationMessage = `Tu oportunidad de negocio "${business.title}" ha recibido un nuevo match de "${user.name}".`;
        const adminNotification = new NotificationMatchModel({
          userId: business.createdBy.userId,
          message: adminNotificationMessage,
          status: "pending",
        });
        await adminNotification.save();
        adminUser.notificationsMatch.notificationsMatchId.push(
          adminNotification._id
        );
        adminUser.notificationsMatch.statusMatch.push(adminNotification.status);
        await adminUser.save();
      }

      await user.save();

      return res
        .status(200)
        .json({ message: "Match exitoso", match: newMatch });
    } else {
      return res.status(400).json({
        message:
          "No hay coincidencia entre el usuario y la oportunidad de negocio",
      });
    }
  } catch (error) {
    console.error("Error al intentar hacer match:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al intentar hacer match" });
  }
};

//Ruta para obtener todos los matches
export const getMatches = async (req: Request, res: Response) => {
  try {
    // Obtener todos los matches de la base de datos
    const matches = await MatchModel.find();
    return res.status(200).json({ matches });
  } catch (error) {
    console.error("Error al obtener los matches:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor al obtener los matches" });
  }
};

//Ruta para obtener un match by ID
export const getMacthByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const match = await MatchModel.findById(id).populate("business");
    if (!match) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro el match",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "match encontrado exitosamente",
      match,
    });
  } catch (error) {
    console.error("Error al buscar el match:", error);
    res.status(500).json({ ok: false, msg: "Error al buscar el match", error });
  }
};

//Ruta para eliminar un match
export const deleteMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const match = await MatchModel.findByIdAndDelete(id);
    if (!match) {
      return res.status(404).json({ message: "Match no encontrado" });
    }
    return res.status(200).json({ message: "Match eliminado exitosamente" });
  } catch (error) {
    console.error("Error al intentar eliminar el match:", error);
    return res.status(500).json({
      message: "Error interno del servidor al intentar eliminar el match",
    });
  }
};
