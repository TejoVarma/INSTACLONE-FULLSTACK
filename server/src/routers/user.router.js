const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/users/:id", userController.getSingleUser);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.put("/users/:id", userController.deleteDp, userController.updateDp);


module.exports = router;