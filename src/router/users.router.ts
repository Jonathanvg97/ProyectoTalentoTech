import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserByID,
  updateUserById,
} from "../controllers/users.controller";
import { validateJWT } from "../middleware/validateJWT.middleware";
import { validateRole } from "../middleware/validateRole.middleware";


const router = Router();

// Ruta para crear un nuevo usuario
router.post("/userCreate", validateJWT,  createUser);

// Ruta para obtener todos los usuarios
router.get("/list", validateJWT, validateRole, getAllUsers);

// Ruta para obtener un usuario por ID
router.get("/:id", validateJWT, getUserByID);

// Ruta para elimina un usuario
router.delete("/:id", validateJWT, deleteUserById);

//Ruta para actualizar un usuario
router.put("/:id", validateJWT, updateUserById);

export default router;

//Componente de Usuarios swagger

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para la gestión de usuarios
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
 *               - clientType
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
 *               clientType:
 *                 type: number
 *                 description: Tipo de cliente
 *                 example: 1
 *                 enum:
 *                   - "[1] Programador, Ingeniero de Software, Diseñador UX/UI"
 *                   - "[2] Médico, Enfermero, Especialista en Salud Mental"
 *                   - "[3] Ingeniero Automotriz, Mecánico de Automóviles, Diseñador de Vehículos"
 *                   - "[4] Chef, Panadero, Barista"
 *                   - "[5] Ingeniero en Energías Renovables, Técnico en Instalaciones Eléctricas"
 *                   - "[6] Profesor, Tutor, Pedagogo"
 *                   - "[7] Diseñador de Moda, Estilista, Modelo"
 *                   - "[8] Guía Turístico, Hotelero, Agente de Viajes"
 *                   - "[9] Actor, Músico, Productor de Cine"
 *                   - "[10] Arquitecto, Ingeniero Civil, Topógrafo"
 *                   - "[11] Banquero, Analista Financiero, Contador"
 *                   - "[12] Agente de Bienes Raíces, Arquitecto de Interiores, Corredor de Propiedades"
 *                   - "[13] Periodista, Editor, Presentador de Noticias"
 *                   - "[14] Chofer, Piloto, Mecánico de Aviones"
 *                   - "[15] Agricultor, Agrónomo, Técnico en Ganadería"
 *                   - "[16] Controlador de inventario, Inspector de calidad, Operador de maquinaria"
 *                   - "[17] Ingeniero en Telecomunicaciones, Técnico en Redes, Desarrollador de Software Telecom"
 *                   - "[18] Abogado, Consultor Legal, Notario"
 *                   - "[19] Ecologista, Ingeniero Ambiental, Reciclador"
 *                   - "[20] Artista, Curador de Arte, Gestor Cultural"
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Usuario creado exitosamente
 *       400:
 *         description: Error al intentar crear el usuario
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar crear el usuario
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
 *       403:
 *         description: No tienes permisos para realizar esta acción
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No tienes permisos para realizar esta acción
 *       500:
 *         description: Error interno del servidor al intentar crear el usuario
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error interno del servidor
 *
 * /api/users/list:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de usuarios obtenido exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Listado de usuarios obtenido exitosamente
 *       400:
 *         description: Error al intentar obtener el listado de usuarios, no se encontró el listado
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar obtener el listado de usuarios, no se encontró el listado
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
 *       403:
 *         description: No tienes permisos para realizar esta acción
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No tienes permisos para realizar esta acción
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
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Usuario encontrado exitosamente
 *       400:
 *         description: Error al intentar obtener el usuario, no se encontró el usuario
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar obtener el usuario, no se encontró el usuario
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
 *       403:
 *         description: No tienes permisos para realizar esta acción
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No tienes permisos para realizar esta acción
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
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Usuario eliminado exitosamente
 *       400:
 *         description: Error al eliminar el usuario, no se encontró el usuario
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al eliminar el usuario, no se encontró el usuario
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
 *       403:
 *         description: No tienes permisos para realizar esta acción
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No tienes permisos para realizar esta acción
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
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *               clientType:
 *                 type: number
 *                 description: Tipo de cliente
 *                 example: 1
 *                 enum:
 *                   - "[1] Programador, Ingeniero de Software, Diseñador UX/UI"
 *                   - "[2] Médico, Enfermero, Especialista en Salud Mental"
 *                   - "[3] Ingeniero Automotriz, Mecánico de Automóviles, Diseñador de Vehículos"
 *                   - "[4] Chef, Panadero, Barista"
 *                   - "[5] Ingeniero en Energías Renovables, Técnico en Instalaciones Eléctricas"
 *                   - "[6] Profesor, Tutor, Pedagogo"
 *                   - "[7] Diseñador de Moda, Estilista, Modelo"
 *                   - "[8] Guía Turístico, Hotelero, Agente de Viajes"
 *                   - "[9] Actor, Músico, Productor de Cine"
 *                   - "[10] Arquitecto, Ingeniero Civil, Topógrafo"
 *                   - "[11] Banquero, Analista Financiero, Contador"
 *                   - "[12] Agente de Bienes Raíces, Arquitecto de Interiores, Corredor de Propiedades"
 *                   - "[13] Periodista, Editor, Presentador de Noticias"
 *                   - "[14] Chofer, Piloto, Mecánico de Aviones"
 *                   - "[15] Agricultor, Agrónomo, Técnico en Ganadería"
 *                   - "[16] Controlador de inventario, Inspector de calidad, Operador de maquinaria"
 *                   - "[17] Ingeniero en Telecomunicaciones, Técnico en Redes, Desarrollador de Software Telecom"
 *                   - "[18] Abogado, Consultor Legal, Notario"
 *                   - "[19] Ecologista, Ingeniero Ambiental, Reciclador"
 *                   - "[20] Artista, Curador de Arte, Gestor Cultural"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Usuario actualizado exitosamente
 *       400:
 *         description: Error al intentar actualizar el usuario, no se encontró el usuario
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error al intentar actualizar el usuario, no se encontró el usuario
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
 *       403:
 *         description: No tienes permisos para realizar esta acción
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: No tienes permisos para realizar esta acción
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
 */
