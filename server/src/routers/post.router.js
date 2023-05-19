require("dotenv").config();
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authentication = require("../utils/auth.utils");


router.get("/posts", authentication, postController.get);

router.get("/posts/:id", authentication, postController.getUserPosts);

router.post("/post", authentication, postController.post);

router.put("/posts/:id", authentication, postController.updateLikes);

router.delete("/posts/:id", authentication, postController.delete);

module.exports = router;