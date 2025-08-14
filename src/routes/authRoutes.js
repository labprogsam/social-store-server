import express from "express";

import { AuthController } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/verifyCredentials", AuthController.verifyCredentials);
router.post("/logout", AuthController.logout);


export default router;
