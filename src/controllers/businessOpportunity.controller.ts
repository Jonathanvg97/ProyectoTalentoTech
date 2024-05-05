import { Request, Response } from "express";
import businessOpportunityModel from "../models/businessOpportunity.model";
import { industryNames } from "../utils/industryNames.utils";

// Ruta para crear una nueva oportunidad
export const createBusinessOpportunity = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const { title, description, status, industry } = body;

    // Verifica si la industria proporcionada es válida
    if (!(industry in industryNames)) {
      return res.status(400).json({
        ok: false,
        msg: "Industria no válida",
      });
    }

    // Crea la nueva oportunidad de negocio
    const newOpportunity = new businessOpportunityModel({
      title,
      description,
      status,
      industry,
    });

    await newOpportunity.save();

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
    res
      .status(500)
      .json({ ok: false, msg: "Error al buscar la oportunidad de negocio", error });
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
    res
      .status(500)
      .json({ ok: false, msg: "Error al actualizar la oportunidad de negocio", error });
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
    res
      .status(500)
      .json({ ok: false, msg: "Error al eliminar la oportunidad de negocio", error });
  }
};
