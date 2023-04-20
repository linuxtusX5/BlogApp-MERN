import Express from "express";
import { getAllBlogsController, CreateBlogsController, 
    updateBlogController, deleteBlogController, 
    UserBlogsController, getBlogController } from "../controller/BlogController.js";
const router = Express.Router();

router.get('/all-blog', getAllBlogsController);

router.post('/create-blog', CreateBlogsController);

router.put('/update-blog/:id', updateBlogController);

router.delete('/delete-blog/:id', deleteBlogController);

router.get('/get-blog/:id', getBlogController)

router.get('/user-blog/:id', UserBlogsController);

export default router;
