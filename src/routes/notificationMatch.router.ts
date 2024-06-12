import express from "express";
import { validateJWT } from "../middleware/validateJWT.middleware";
import {
  acceptNotificationByAdmin,
  acceptNotificationByUser,
  cancelNotificationByAdmin,
  cancelNotificationByUser,
  getAllUserNotifications,
} from "../controllers/notificationMatch.controller";
import { validateRole } from "../middleware/validateRole.middleware";

const router = express.Router();

// Ruta para obtener todas las notificaciones de un usuario por su ID
router.get("/list/:userId", validateJWT, getAllUserNotifications);

// Controlador para aceptar una notificación por el usuario
router.put(
  "/notifications/user/:notificationId/accepted",
  validateJWT,
  acceptNotificationByUser
);

// Controlador para aceptar una notificación por el administrador
router.put(
  "/notifications/admin/:notificationId/accepted",
  validateJWT,
  validateRole,
  acceptNotificationByAdmin
);

// Controlador para cancelar una notificación por el usuario
router.put(
  "/notifications/user/:notificationId/cancel",
  validateJWT,
  cancelNotificationByUser
);

// Controlador para cancelar una notificación por el administrador
router.put(
  "/notifications/admin/:notificationId/cancel",
  validateJWT,
  validateRole,
  cancelNotificationByAdmin
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para la gestión de notificaciones
 */

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
 * /api/notificationMatch/list/{id}:
 *  get:
 *    summary: obtener una notificación por ID
 *    tags: [Notifications Match]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID de la notificación del match
 *      schema:
 *        type: string
 *    responses:
 *       200:
 *         description: Notificación encontrado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Notificación encontrado exitosamente
 *       400:
 *         description: Error al intentar obtener la Notificación, no se encontró la Notificación
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar obtener la Notificación, no se encontró la Notificación
 *       401:
 *         description: No se encontró el token de autenticación
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el token de autenticación
 *       500:
 *         description: Error interno del servidor
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 *
 * /api/notificationMatch/notifications/user/{notificationId}/accepted:
 *  put:
 *    summary: aceptar una notificación por el usuario
 *    tags: [Notifications Match]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: notificationId
 *      required: true
 *      description: ID de la notificación del match
 *      schema:
 *        type: string
 *    responses:
 *       200:
 *         description: Notificación aceptada exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Notificación aceptada exitosamente
 *       400:
 *         description: Error al intentar aceptar la Notificación
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar aceptar la Notificación
 *       401:
 *         description: No se encontró el token de autenticación
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el token de autenticación
 *       500:
 *         description: Error interno del servidor
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 * /api/notificationMatch/notifications/admin/{notificationId}/cancel:
 *  put:
 *    summary: cancelar una notificación por el administrador
 *    tags: [Notifications Match]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: notificationId
 *      required: true
 *      description: ID de la notificación del match
 *      schema:
 *        type: string
 *    responses:
 *       200:
 *         description: Notificación cancelada exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Notificación cancelada exitosamente
 *       400:
 *         description: Error al intentar cancelar la Notificación
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar cancelar la Notificación
 *       401:
 *         description: No se encontró el token de autenticación
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No se encontró el token de autenticación
 *       500:
 *         description: Error interno del servidor
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 *  
 *
 *
 */
