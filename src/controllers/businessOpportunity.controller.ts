import { Request, Response } from "express";
import businessOpportunityModel from "../models/businessOpportunity.model";
import { industryNames } from "../utils/industryNames.utils";
import UserModel from "../models/users.model";
import { CustomRequest } from "../middleware/validateRole.middleware";

// Ruta para crear una nueva oportunidad
export const createBusinessOpportunity = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    // Obtiene el ID del usuario de la solicitud
    const userId = req.user?._id;
    // Verificar si se encontró el ID del usuario
    if (!userId) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario no especificado en la solicitud",
      });
    }

    // Obtener el usuario correspondiente al ID
    const user = await UserModel.findById(userId);
    // Obtener el nombre de usuario del usuario
    const userName = user?.name;

    // Verificar si se encontró el usuario
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    const { title, description, industry } = req.body;

    // Verificar si se proporcionó una industria válida
    if (!(industry in industryNames)) {
      return res.status(400).json({
        ok: false,
        msg: "Industria no válida",
      });
    }

    // Crear la nueva oportunidad de negocio y asociarla con el usuario
    const newOpportunity = new businessOpportunityModel({
      title,
      description,
      status: "active",
      industry,
      createdBy: {
        userId,
        userName,
      },
    });

    const savedBusiness = await newOpportunity.save();

    // Agregar la oportunidad de negocio al usuario
    user.createdBusinesses.push(savedBusiness._id);
    await user.save();

    res.status(200).json({
      ok: true,
      msg: "Oportunidad de negocio creada exitosamente",
      opportunity: newOpportunity,
    });
  } catch (error) {
    console.error("Error al crear la oportunidad de negocio:", error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor al intentar crear la oportunidad de negocio",
      error,
    });
  }
};

// Ruta para obtener todas las oportunidades
export const getAllbusinessOpportunity = async (
  req: Request,
  res: Response
) => {
  try {
    const businessOpportunity = await businessOpportunityModel.find();
    res.status(200).json({
      ok: true,
      msg: "Oportunidades encontradas exitosamente",
      businessOpportunity,
    });
  } catch (error) {
    console.error("Error al buscar las oportunidades:", error);
    res
      .status(500)
      .json({ ok: false, msg: "Error al buscar las oportunidades", error });
  }
};

// Ruta para obtener una oportunidad por ID
export const getBusinessOpportunityByID = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const oportunity = await businessOpportunityModel.findById(id);
    if (!oportunity) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro la oportunidad",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Oportunidad de negocio encontrada exitosamente",
      oportunity,
    });
  } catch (error) {
    console.error("Error al buscar la oportunidad de negocio:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al buscar la oportunidad de negocio",
      error,
    });
  }
};

// Ruta para actualizar una oportunidad por ID
export const updateBusinessOpportunityByID = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const oportunity = await businessOpportunityModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      }
    );
    if (!oportunity) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro la oportunidad",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Oportunidad de negocio actualizada exitosamente",
      oportunity,
    });
  } catch (error) {
    console.error("Error al actualizar la oportunidad de negocio:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar la oportunidad de negocio",
      error,
    });
  }
};

// Ruta para eliminar una oportunidad por ID
export const deleteBusinessOpportunityByID = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const oportunity = await businessOpportunityModel.findByIdAndDelete(id);
    if (!oportunity) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro la oportunidad de negocio",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Oportunidad de negocio eliminada exitosamente",
      oportunity,
    });
  } catch (error) {
    console.error("Error al eliminar la oportunidad de negocio:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar la oportunidad de negocio",
      error,
    });
  }
};
