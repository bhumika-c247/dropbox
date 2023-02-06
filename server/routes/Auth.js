
import express from "express";
import AuthController from "../controllers/AuthController.js";
import { validateToken } from "../middlewares/auth.js";
import { handleValidationErrors }  from "../middlewares/validation.js";
import { LoginValidation } from "../validators/auth.js";
const authRouter = express.Router();

authRouter.post("/login",LoginValidation, handleValidationErrors,AuthController.login )

export default authRouter;