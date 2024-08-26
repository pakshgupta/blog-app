import {Router} from 'express'
import { loginUserController, logoutController, registerUserController } from '../controllers/user.controller.js';
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router=Router();
router.route('/signup').post(upload.single("avatar"),registerUserController);
router.route('/signin').post(loginUserController);
router.route('/signout').get(verifyJWT,logoutController);
export default router;