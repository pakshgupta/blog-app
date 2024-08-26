import { Router } from "express";
import { createPostController, deletePostController, getPostController, updatePostController, userPostController } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.route("/").post(verifyJWT,upload.single("image"),createPostController);
router.route("/").get(verifyJWT,userPostController);
router.route("/:id").get(verifyJWT,getPostController);
router.route("/:id").put(verifyJWT,upload.single("image"),updatePostController);
router.route("/:id").delete(verifyJWT,deletePostController);
export default router;
