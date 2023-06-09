require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/image.utlis");

const userControllers = {};

userControllers.getSingleUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.status(200).json({ status: "Success", user });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

userControllers.register = async (req, res) => {
    let { name, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ status: "Failed", field: "email", message: "Email already exist!!" })
        let newUser = await new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        newUser = await newUser.save();
        res.status(201).json({ status: "Success", data: newUser });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

userControllers.login = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                let jwtToken = await jwt.sign({ name: user.name, email: user.email, id: user["_id"] }, process.env.SECRET);
                res.status(200).json({ status: "Success", token: "JWT " + jwtToken, user });
            } else {
                res.status(401).json({ status: "Failed", field: "password", message: "Password not match!!" });
            }
        } else {
            res.status(401).json({ status: "Failed", field: "email", message: "User not found!!" });
        }

    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

userControllers.updateDp = async (req, res) => {
    try {
        let uploadedFile = await cloudinary.v2.uploader.upload(req.body.dp, { folder: "INSTACLONE-DP" });
        let user = await User.findByIdAndUpdate(req.params.id, {
            profile_picture: {
                url: uploadedFile.secure_url,
                id: uploadedFile.public_id
            }
        }, { new: true });
        res.status(201).json({ status: "Success", user });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

userControllers.deleteDp = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ status: "Failed", message: "Invalid Id" });
        if (!user.profile_picture) return next();
        await cloudinary.v2.uploader.destroy(user.profile_picture.id);
        next();
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

module.exports = userControllers;