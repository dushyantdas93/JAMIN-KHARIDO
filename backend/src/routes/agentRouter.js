import {
  createAgent,
  editAgentDetails,
  getAgentDetails,
  uploadAgentDocument,
} from "../controllers/agentController.js";

import express from "express";
import { authMiddlewareInstance } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multerConfig.js";

export const agentRouter = express.Router();
/**
 *
 * READ
 *
 */
agentRouter.get("/me", authMiddlewareInstance.agentMiddleware, getAgentDetails);
agentRouter.post(
  "/uploadDocument",
  authMiddlewareInstance.agentMiddleware,
  upload.fields([
    { name: "adhaarImage", maxCount: 1 },
    { name: "panImage", maxCount: 1 },
    { name: "licenceImage", maxCount: 1 },
    { name: "gstImage", maxCount: 1 },
  ]),
  uploadAgentDocument
);

/**
 *
 * CREATE
 *
 */
agentRouter.post("/", upload.single("image"), createAgent);

/**
 *
 * UPDATE
 *
 */
agentRouter.put("/", authMiddlewareInstance.agentMiddleware, editAgentDetails);

/**
 *
 * DELETE
 *
 */
// agentRouter.delete("/homes/:id", deactivateagent);
