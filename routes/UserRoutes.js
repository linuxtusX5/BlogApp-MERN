import Express from "express";
import { LoginController, getAllUsers, registerController } from "../controller/UserController.js";

//Router Object
const router = Express.Router();

//GEt All User
router.get('/all-users', getAllUsers);

//Create user
router.post('/register', registerController);

//Login
router.post('/login', LoginController);

export default router;