import { Router } from "express";
import { PERMISSIONS } from "@app/shared";
import { authenticate } from "../../middlewares/authenticate.js";
import { authorize } from "../../middlewares/authorize.js";
import { usersController } from "./users.controller.js";

const router = Router();
router.get("/", authenticate, authorize(PERMISSIONS.USERS_READ), usersController.list);
export default router;
