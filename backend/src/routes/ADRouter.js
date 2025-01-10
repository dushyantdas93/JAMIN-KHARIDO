import { deleteFlatAd, deleteHomeAd,  deleteLandAd,  deleteShopAd,  editFlatAd,  editHomeAd,  editLandAd,  editShopAd,  getAllFlatAds,  getAllHomeAds,  getAllLandAds,  getAllShopAds,  postFlatAd, postHomeAd, postLandAd, postShopAd } from "../controllers/adController.js";
// import { app } from "../index.js";

import express from "express";
import { authMiddlewareInstance } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multerConfig.js";

export const AdRouter = express.Router();
/**
 *
 * READ
//  *
//  */

AdRouter.get("/homes",getAllHomeAds);
AdRouter.get("/flats", getAllFlatAds);
AdRouter.get("/lands", getAllLandAds);
AdRouter.get("/shops", getAllShopAds);
// /**
//  *
//  * CREATE
//  *
//  */
AdRouter.post("/homes", authMiddlewareInstance.agentMiddleware, upload.array("homeAdImages", 5), postHomeAd);

AdRouter.post(
  "/flats",
  authMiddlewareInstance.agentMiddleware,
  upload.array("flatsAdImages", 5),
  postFlatAd
);

AdRouter.post(
  "/lands",
  authMiddlewareInstance.agentMiddleware,
  upload.array("landsAdImages", 5),
  postLandAd
);

AdRouter.post(
  "/shops",
  authMiddlewareInstance.agentMiddleware,
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
  authMiddlewareInstance.agentMiddleware,
  upload.array("homeAdImages", 5),
  editHomeAd
);


AdRouter.put("/flats/:homeAdId", authMiddlewareInstance.agentMiddleware,
  upload.array("homeAdImages", 5), editFlatAd);
AdRouter.put("/lands/:homeAdId", authMiddlewareInstance.agentMiddleware,
  upload.array("homeAdImages", 5), editLandAd);
AdRouter.put("/shops/:homeAdId", authMiddlewareInstance.agentMiddleware,
  upload.array("homeAdImages", 5), editShopAd);
// /**
//  *
//  * DELETE
//  *
//  */
// AdRouter.delete("/homes/:id", deleteHomeAd);

AdRouter.delete(
  "/homes/:homeAdId",
  authMiddlewareInstance.agentMiddleware,
  deleteHomeAd
);

AdRouter.delete(
  "/flats/:homeAdId",
  authMiddlewareInstance.agentMiddleware,
  deleteFlatAd
);
AdRouter.delete(
  "/lands/:homeAdId",
  authMiddlewareInstance.agentMiddleware,
  deleteLandAd
);
AdRouter.delete(
  "/shops/:homeAdId",
  authMiddlewareInstance.agentMiddleware,
  deleteShopAd
);
