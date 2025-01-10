import { agentLogin, agentLogout, customerLogin, customerLogout } from "../controllers/authController.js";
import { app } from "../index.js";
import express from "express";
import { authMiddlewareInstance } from "../middlewares/authMiddleware.js";

export const authRouter = express.Router();
/**
 *
 * LOGIN
 *
 */
authRouter.get("/customer/login", customerLogin);
authRouter.get("/agent/login", agentLogin);
// authRouter.get("admin/login", adminLogin);

// /**
//  *
//  * LOGOUT
//  *
//  */
authRouter.post("/customer/logout",authMiddlewareInstance.customerMiddleware, customerLogout);
authRouter.post("/agent/logout",authMiddlewareInstance.agentMiddleware, agentLogout);
// authRouter.get("admin/logout", adminLogout);