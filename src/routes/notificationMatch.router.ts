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
router.put("/notifications/user/:notificationId/cancel",validateJWT, cancelNotificationByUser);

// Controlador para cancelar una notificación por el administrador
router.put("/notifications/admin/:notificationId/cancel", validateJWT, validateRole, cancelNotificationByAdmin);


export default router;
