import express from "express";
import {adminState} from "../controller/state.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {verifyAdmin} from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/admin-state",verifyToken,verifyAdmin,adminState)

export default router