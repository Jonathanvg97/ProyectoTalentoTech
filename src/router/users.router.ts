import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserByID,
} from "../controllers/users.controller";

const router = Router();

// Ruta para crear un nuevo usuario
router.post("/userCreate", createUser);

// Ruta para obtener todos los usuarios
router.get("/list", getAllUsers);

// Ruta para obtener un usuario por ID
router.get("/:id", getUserByID);

// Ruta para elimina un usuario
router.delete("/:id", deleteUserById);

export default router;

//Componente de Usuarios swagger
/**
 * @swagger
 *  /api/users/userCreate:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *               role:
 *                 type: string
 *                 description: Rol del usuario
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error al intentar crear el usuario
 *       500:
 *         description: Error interno del servidor al intentar crear el usuario
 *
 * /api/users/list:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *         200:
 *             description: Listado de usuarios obtenido exitosamente
 *         400:
 *             description: Error al intentar obtener el listado de usuarios, no se encontro el listado
 *         500:
 *              description: Error al intentar obtener el listado de usuarios
 *
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: string
 *     responses:
 *         200:
 *            description: Usuario encontrado exitosamente
 *         400:
 *            description: Error al intentar obtener el usuario, no se encontro el usuario
 *         500:
 *            description: Error al intentar obtener el usuario
 *
 *   delete:
 *     summary: Obtener el ID de un usuario para Eliminar
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *         200:
 *            description: Usuario eliminado exitosamente
 *         400:
 *            description: Error al eliminar el usuario, no se encontro el usuario
 *         500:
 *            description: Error al intentar eliminar el usuario
 *
 */
