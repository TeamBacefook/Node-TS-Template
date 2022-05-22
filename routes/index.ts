import docsRoute from "./docs.route";
import config from "../config/config";
import { Router } from "express";

const router = Router();

if (config.env === "development") {
  router.use("/docs", docsRoute);
}

export default router;
