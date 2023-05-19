require("dotenv").config();
const Post = require("../models/post.model");
const User = require("../models/user.model");
const cloudinary = require("../utils/image.utlis");

const postControllers = {};

postControllers.get = async (req, res) => {
    let page = req.query.page;
    try {
        let posts = await Post.find();
        let start = (page * 5) - 5;
        let end = page * 5;
        let slicedPosts = posts.slice(start, end)
        res.status(200).json({ status: "Success", data: slicedPosts });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

postControllers.getUserPosts = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ status: "Failed", message: "Invalid user" });
        let posts = await Post.find({ user: user._id });
        res.status(200).json({ status: "Success", data: posts });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

postControllers.post = async (req, res) => {
    try {
        let uploadedFile = await cloudinary.v2.uploader.upload(req.body.PostImage, { folder: "INSTACLONE-POSTS" });

        let newPost = await new Post({
            ...req.body,
            PostImage: {
                url: uploadedFile.secure_url,
                id: uploadedFile.public_id
            }
        })
        newPost = await newPost.save();
        await User.findByIdAndUpdate(req.body.user, { $push: { posts: newPost._id } });
        res.status(201).json({ status: "Success", data: newPost });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

postControllers.updateLikes = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ status: "Failed", message: "Invalid Id" });
        if (post.likes.indexOf(req.body.user) === -1) {
            post = await Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.body.user } }, { new: true });
            res.status(200).json({ status: "Success", post });
        } else {
            res.status(401).json({ status: "Failed", message: "Already like given!!" });
        }

    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

postControllers.delete = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ status: "Failed", message: "Invalid Id" });
        await cloudinary.v2.uploader.destroy(post.PostImage.id);
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "Success" });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}
module.exports = postControllers;