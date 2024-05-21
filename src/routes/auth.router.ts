import { Router } from "express";
import { check } from "express-validator";
import {
  authenticateLogin,
  forgetPassword,
  passwordChange,
  signOutUser,
} from "../controllers/auth.controller";
import { validateFields } from "../middleware/validateFields.middleware";
import {
  validateJWT,
  validateJWTPass,
} from "../middleware/validateJWT.middleware";

const router = Router();

// Ruta para iniciar sesión
router.post(
  "/login",
  [
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    validateFields,
  ],
  authenticateLogin
);

router.post("/signOut/:id", validateJWT, signOutUser);

router.post(
  "/forgetPassword",
  [
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    validateFields,
  ],
  forgetPassword
);

router.put(
  "/resetPassword",
  [
    check(
      "password",
      "La contraseña es obligatoria y debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial"
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
    validateFields,
  ],
  validateJWTPass,
  passwordChange
);

export default router;
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
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: 0Tq5K@example.com
 *               password:
 *                 type: string
 *                 description: Contrasena del usuario
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales incorrectas
 *       404:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *
 * /api/auth/forgetPassword:
 *   post:
 *     summary: Enviar correo de cambio de contrasena
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: 0Tq5K@example.com
 *     responses:
 *       200:
 *         description: Correo enviado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Correo enviado exitosamente
 *       404:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *
 * /api/auth/resetPassword:
 *   put:
 *     summary: Cambiar contrasena
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: Contrasena del usuario
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Contrasena cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contrasena cambiada exitosamente
 *       401:
 *         description: Token de recuperación incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *
 *
 */
