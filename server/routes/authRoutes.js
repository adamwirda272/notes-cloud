import e from "express";
import { registerUser, loginUser, logoutUser, generateAccessToken } from "../controllers/usersControllers.js";

const router = e.Router();

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.delete("/api/logout", logoutUser);
router.get("/api/refresh_token", generateAccessToken);

export default router;