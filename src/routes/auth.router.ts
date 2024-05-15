import { Router } from "express";
import { check } from "express-validator";
import {
  authenticateLogin,
  forgetPassword,
  passwordChange,
} from "../controllers/auth.controller";
import { validateFields } from "../middleware/validateFields.middleware";
import { validateJWTPass } from "../middleware/validateJWT.middleware";

const router = Router();

// Ruta para iniciar sesión
router.post("/login", authenticateLogin);

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
  validateJWTPass,
  [
    check("password", "La contrasena es obligatoria").not().isEmpty(),
    validateFields,
  ],
  passwordChange
);

export default router;

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
 *
 */
