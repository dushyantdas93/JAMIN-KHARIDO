import {
  deleteFlatAd,
  deleteHomeAd,
  deleteLandAd,
  deleteShopAd,
  editFlatAd,
  editHomeAd,
  editLandAd,
  editShopAd,
  getAllFlatAds,
  getAllHomeAds,
  getAllLandAds,
  getAllShopAds,
  postFlatAd,
  postHomeAd,
  postLandAd,
  postShopAd,
} from "../controllers/adController.js";
// import { app } from "../index.js";

import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multerConfig.js";

export const AdRouter = express.Router();
/**
 *
 * READ
//  *
//  */

AdRouter.get("/homes", getAllHomeAds);
AdRouter.get("/flats", getAllFlatAds);
AdRouter.get("/lands", getAllLandAds);
AdRouter.get("/shops", getAllShopAds);
// /**
//  *
//  * CREATE
//  *
//  */
AdRouter.post(
  "/homes",
  authMiddleware.agentMiddleware,
  upload.array("homeAdImages", 5),
  postHomeAd
);

AdRouter.post(
  "/flats",
  authMiddleware.agentMiddleware,
  upload.array("flatsAdImages", 5),
  postFlatAd
);

AdRouter.post(
  "/lands",
  authMiddleware.agentMiddleware,
  upload.array("landsAdImages", 5),
  postLandAd
);

AdRouter.post(
  "/shops",
  authMiddleware.agentMiddleware,
  upload.array("shopsAdImages", 5),
  postShopAd
);

// /**
//  *
//  * UPDATE
//  *
//  */

AdRouter.put(
  "/homes/:homeAdId",
  authMiddleware.agentMiddleware,
  upload.array("homeAdImages", 5),
  editHomeAd
);

AdRouter.put(
  "/flats/:homeAdId",
  authMiddleware.agentMiddleware,
  upload.array("homeAdImages", 5),
  editFlatAd
);
AdRouter.put(
  "/lands/:homeAdId",
  authMiddleware.agentMiddleware,
  upload.array("homeAdImages", 5),
  editLandAd
);
AdRouter.put(
  "/shops/:homeAdId",
  authMiddleware.agentMiddleware,
  upload.array("homeAdImages", 5),
  editShopAd
);
// /**
//  *
//  * DELETE
//  *
//  */
// AdRouter.delete("/homes/:id", deleteHomeAd);

AdRouter.delete(
  "/homes/:homeAdId",
  authMiddleware.agentMiddleware,
  deleteHomeAd
);

AdRouter.delete(
  "/flats/:homeAdId",
  authMiddleware.agentMiddleware,
  deleteFlatAd
);
AdRouter.delete(
  "/lands/:homeAdId",
  authMiddleware.agentMiddleware,
  deleteLandAd
);
AdRouter.delete(
  "/shops/:homeAdId",
  authMiddleware.agentMiddleware,
  deleteShopAd
);
