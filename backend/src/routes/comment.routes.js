import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCommentController, getAllCommentsOfPostController } from "../controllers/comment.controller.js";
const router = Router();
router.route("/:postId").post(verifyJWT,createCommentController);
router.route("/:postId").get(verifyJWT,getAllCommentsOfPostController);
export default router;
