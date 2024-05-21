import { Router } from "express";
import {
  createBusinessOpportunity,
  deleteBusinessOpportunityByID,
  getAllbusinessOpportunity,
  getBusinessOpportunityByID,
  updateBusinessOpportunityByID,
} from "../controllers/businessOpportunity.controller";
import { check } from "express-validator";
import { validateFields } from "../middleware/validateFields.middleware";

const router = Router();

// Ruta para crear una nueva oportunidad
router.post(
  "/create",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("status").not().isEmpty(),
    check("industry").not().isEmpty(),
    validateFields,
  ],
  createBusinessOpportunity
);

// Ruta para obtener todas las oportunidades
router.get("/list", getAllbusinessOpportunity);

// Ruta para obtener una oportunidad por ID
router.get("/:id", getBusinessOpportunityByID);

// Ruta para elimina una oportunidad
router.delete("/:id", deleteBusinessOpportunityByID);

// Ruta para actualizar una oportunidad
router.put("/:id", updateBusinessOpportunityByID);

export default router;

/**
 * @swagger
 * /api/businessOpportunity/create:
 *   post:
 *     summary: Crear una nueva oportunidad de negocio
 *     tags: [Business Opportunity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *               - industry
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la oportunidad de negocio
 *               description:
 *                 type: string
 *                 description: Descripción de la oportunidad de negocio
 *               status:
 *                 type: string
 *                 description: Estado de la oportunidad de negocio
 *                 example: active
 *               industry:
 *                 type: number
 *                 description: Industria de la oportunidad de negocio
 *                 example: 1
 *                 enum:
 *                   - "[1] Tecnología"
 *                   - "[2] Salud"
 *                   - "[3] Automotriz"
 *                   - "[4] Alimentos y bebidas"
 *                   - "[5] Energía"
 *                   - "[6] Educación"
 *                   - "[7] Moda"
 *                   - "[8] Turismo"
 *                   - "[9] Entretenimiento"
 *                   - "[10] Construcción"
 *                   - "[11] Finanzas"
 *                   - "[12] Bienes raíces"
 *                   - "[13] Medios de comunicación"
 *                   - "[14] Transporte"
 *                   - "[15] Agricultura"
 *                   - "[16] Manufactura"
 *                   - "[17] Telecomunicaciones"
 *                   - "[18] Servicios profesionales"
 *                   - "[19] Medio ambiente"
 *                   - "[20] Arte y cultura"
 *     responses:
 *       200:
 *         description: Oportunidad de negocio creada exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Oportunidad de negocio creada exitosamente
 *
 *       400:
 *         description: Error al intentar crear la oportunidad de negocio
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar crear la oportunidad de negocio
 *       500:
 *         description: Error interno del servidor al intentar crear la oportunidad de negocio
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor al intentar crear la oportunidad de negocio
 *
 * /api/businessOpportunity/list:
 *   get:
 *     summary: Obtener todas las oportunidades de negocio
 *     tags: [Business Opportunity]
 *     responses:
 *       200:
 *         description: Listado de oportunidades de negocio obtenido exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Listado de oportunidades de negocio obtenido exitosamente
 *       400:
 *         description: Error al intentar obtener el listado de oportunidades de negocio, no se encontró el listado
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar obtener el listado de oportunidades de negocio, no se encontró el listado
 *       500:
 *         description: Error al intentar obtener el listado de oportunidades de negocio
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servior, error al intentar obtener el listado de oportunidades de negocio
 *
 * /api/businessOpportunity/{id}:
 *   get:
 *     summary: Obtener una oportunidad de negocio por ID
 *     tags: [Business Opportunity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la oportunidad de negocio a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Oportunidad de negocio encontrada exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Oportunidad de negocio encontrada exitosamente
 *       400:
 *         description: Error al intentar obtener la oportunidad de negocio, no se encontró la oportunidad
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar obtener la oportunidad de negocio, no se encontró la oportunidad
 *       500:
 *         description: Error al intentar obtener la oportunidad de negocio
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error inertno del servidor, error al intentar obtener la oportunidad de negocio
 *   delete:
 *     summary: Eliminar una oportunidad de negocio por ID
 *     tags: [Business Opportunity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la oportunidad de negocio a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Oportunidad de negocio eliminada exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Oportunidad de negocio eliminada exitosamente
 *       400:
 *         description: Error al eliminar la oportunidad de negocio, no se encontró la oportunidad
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar eliminar la oportunidad de negocio, no se encontró la oportunidad
 *       500:
 *         description: Error al intentar eliminar la oportunidad de negocio
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor, error al intentar eliminar la oportunidad de negocio
 *
 *   put:
 *     summary: Actualizar una oportunidad de negocio por ID
 *     tags: [Business Opportunity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la oportunidad de negocio a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *               - industry
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la oportunidad de negocio
 *               description:
 *                 type: string
 *                 description: Descripción de la oportunidad de negocio
 *               status:
 *                 type: string
 *                 description: Estado de la oportunidad de negocio
 *                 example: active
 *               industry:
 *                 type: number
 *                 description: Industria de la oportunidad de negocio
 *                 example: 1
 *                 enum:
 *                   - "[1] Tecnología"
 *                   - "[2] Salud"
 *                   - "[3] Automotriz"
 *                   - "[4] Alimentos y bebidas"
 *                   - "[5] Energía"
 *                   - "[6] Educación"
 *                   - "[7] Moda"
 *                   - "[8] Turismo"
 *                   - "[9] Entretenimiento"
 *                   - "[10] Construcción"
 *                   - "[11] Finanzas"
 *                   - "[12] Bienes raíces"
 *                   - "[13] Medios de comunicación"
 *                   - "[14] Transporte"
 *                   - "[15] Agricultura"
 *                   - "[16] Manufactura"
 *                   - "[17] Telecomunicaciones"
 *                   - "[18] Servicios profesionales"
 *                   - "[19] Medio ambiente"
 *                   - "[20] Arte y cultura"
 *     responses:
 *       200:
 *         description: Oportunidad de negocio actualizada exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Oportunidad de negocio actualizada exitosamente
 *       400:
 *         description: Error al intentar actualizar la oportunidad de negocio, no se encontró la oportunidad
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar actualizar la oportunidad de negocio, no se encontró la oportunidad
 *       404:
 *         description: No se encontró la oportunidad de negocio
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró la oportunidad de negocio
 *       500:
 *         description: Error al intentar actualizar la oportunidad de negocio
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor, error al intentar actualizar la oportunidad de negocio
 */
