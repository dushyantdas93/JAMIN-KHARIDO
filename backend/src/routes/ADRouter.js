import { postFlatAd, postHomeAd, postLandAd, postShopAd } from "../controllers/adController.js";
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
// AdRouter.get("/homes", getAllHomeAds);
// AdRouter.get("/flats", getAllFlatAds);
// AdRouter.get("/lands", getAllLandAds);
// AdRouter.get("/shops", getAllShopAds);
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
// AdRouter.put("/homes/:id", editHomeAd);
// AdRouter.put("/flats/:id", editFlatAd);
// AdRouter.put("/lands/:id", editLandAd);
// AdRouter.put("/shops/:id", editShopAd);
// /**
//  *
//  * DELETE
//  *
//  */
// AdRouter.delete("/homes/:id", deleteHomeAd);
// AdRouter.delete("/flats/:id", deleteFlatAd);
// AdRouter.delete("/lands/:id", deleteLandAd);
// AdRouter.delete("/shops/:id", deleteShopAd);
