import { Router } from "express";
import {
  createMatch,
  deleteMatch,
  getMacthByID,
  getMatches,
} from "../controllers/match.controller";
import { check } from "express-validator";
import { validateJWT } from "../middleware/validateJWT.middleware";

const router = Router();

//Ruta para realizar un match
router.post(
  "/createMatch",
  check("userId").not().isEmpty(),
  check("businessId").not().isEmpty(),
  validateJWT,
  createMatch
);

//Ruta para obtener todos los matches
router.get("/list", validateJWT, getMatches);

//Ruta para obtener un match by ID
router.get("/:id", validateJWT, getMacthByID);

//Ruta para eliminar un match
router.delete("/:id", validateJWT, deleteMatch);

export default router;

//Componente de Usuarios swagger
/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 *  /api/match/createMatch:
 *   post:
 *      summary: Crear un nuevo match
 *      tags: [Match]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userId
 *                - businessId
 *              properties:
 *                userId:
 *                  type: string
 *                  description: ID del usuario
 *                businessId:
 *                  type: string
 *                  description: ID de la oportunidad de negocio
 *              example:
 *                userId: 1
 *                businessId: 1
 *      responses:
 *        200:
 *          description: El match fue exitoso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: El match fue exitoso
 *        400:
 *          description: No hay coincidencia entre el usuario y la oportunidad de negocio
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No hay coincidencia entre el usuario y la oportunidad de negocio
 *        401:
 *          description: No se encontró el token de autenticación
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el token de autenticación
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 *        404:
 *          description: No se encontró el usuario o la oportunidad de negocio
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el usuario o la oportunidad de negocio
 *        409:
 *          description: El usuario ya tiene un match con la oportunidad de negocio
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: El usuario ya tiene un match con la oportunidad de negocio
 *
 * /api/match/list:
 *   get:
 *      summary: Obtener todos los matches
 *      tags: [Match]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Todos los matches
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Todos los matches fueron obtenidos exitosamente
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 *        401:
 *          description: No se encontró el token de autenticación
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el token de autenticación
 *        404:
 *          description: No se encontró ningún match
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró ningún match
 *
 * /api/match/{id}:
 *    get:
 *      summary: Obtener un match por ID
 *      tags: [Match]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID del match
 *      responses:
 *        200:
 *          description: Se obtuvo el match exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Se obtuvo el match exitosamente
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 *        401:
 *          description: No se encontró el token de autenticación
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el token de autenticación
 *        404:
 *          description: No se encontró el match
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el match
 *
 *    delete:
 *      summary: Eliminar un match
 *      tags: [Match]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID del match
 *      responses:
 *        200:
 *          description: El match fue eliminado exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: El match fue eliminado exitosamente
 *        500:
 *          description: Error interno del servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 *        401:
 *          description: No se encontró el token de autenticación
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el token de autenticación
 *        404:
 *          description: No se encontró el match
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el match
 *        409:
 *          description: No se puede eliminar el match
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se puede eliminar el match
 *        400:
 *          description: El ID del match no es válido
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: El ID del match no es válido
 */
