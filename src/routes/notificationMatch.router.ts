import express from "express";
import { validateJWT } from "../middleware/validateJWT.middleware";
import { getAllUserNotifications } from "../controllers/notificationMatch.controller";

const router = express.Router();

router.get("/list/:userId", validateJWT, getAllUserNotifications);

export default router;
