import express from "express"
import { register ,login,logout, updateProfile, getAllUser} from "../controllers/userController.js";
import { isAuthenticated } from "../controllers/isAuthenticated.js";
import { singleUpload } from "../multer.js";
const router=express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").put(isAuthenticated,singleUpload,updateProfile) //updation
router.get('/all-users', getAllUser);
export default router;