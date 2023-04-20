import BlogModel from "../models/BlogModels.js";
import UserModel from "../models/UserModel.js";
import mongoose from "mongoose";

export async function getAllBlogsController(req, res){
    try {
        const blogs = await BlogModel.find({}).populate('user');
        if(!blogs){
            return res.status(200).send({
                success: false,
                message: "No Blogs Found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "All Blogs Lists",
            blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error While Getting Blog",
            success: false,
            error
        })
    }
}

export async function CreateBlogsController(req, res){
    try {
        const { title, description, image, user } = req.body

        if(!title || !description || !image || !user){
            return res.status(400).send({
                success: false,
                message: "Please Provide All Field!"
            })
        }

        const existingUser = await UserModel.findById(user);
        if(!existingUser){
            return res.status(404).send({
                success: false,
                message: "Unable to find user"
            })
        }
        const newBlog = new BlogModel({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blog.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();

        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error While Creating Blog",
            error
        })
    }
}

export async function updateBlogController(req, res){
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await BlogModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        return res.status(200).send({
            success: true,
            message: "Updated Successfully!",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Error Update!",
            success: false,
            error
        })
    }
}

//for Single Blog
export async function getBlogController(req, res){
    try {
        const { id } = req.params;
        const blog = await BlogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success: false,
                message: "Blog not Found!"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Blog Found",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Error While Getting Single Blog!",
            success: false,
            error
        })
    }
}

export async function deleteBlogController(req, res){
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id).populate("user")
        if(blog && blog.user && blog.user.blogs){
            await blog.user.blog.pull(blog);
            await blog.user.save();
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Error While Deleting Blog!",
            success: false,
            error
        })
    }
}

export async function UserBlogsController(req, res){
    try {
        const userBlog = await UserModel.findById(req.params.id).populate("blog");
        if(!userBlog){
            return res.status(404).send({
                success: false,
                message: "Blogs not found with this ID!"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User Blogs",
            userBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Error in user  Blog!!",
            success: false,
            error
        })
    }
}