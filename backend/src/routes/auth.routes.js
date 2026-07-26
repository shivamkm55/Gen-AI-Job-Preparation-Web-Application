const express = require("express")
const authController = require("../controllers/auth.controller")
const authRouter = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerusercontroller)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */

authRouter.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @desc clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController)

module.exports = authRouter

/**
 * @route GET /api/auth/get-me
 * @desc get the logged in user details
 * @access Private
 */
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)
