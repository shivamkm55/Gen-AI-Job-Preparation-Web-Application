const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")
/**
 * @name registerusercontroller
 * @desc register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerusercontroller(req,res){
    const{username,email,password} = req.body
    if(!username || !email || ! password){
        return res.status(400).json({
            message: "please provide username, email, password"
        })
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username},{email}] // ye check karta h ky username or email dono me se koi bhi mil jaye to store karlo
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {id : user._id,username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            id: user.id,
            username:user.username,
            email:user.email
        }
    })
}
/**
 * @name loginUserController
 * @desc login a user, expects email and password in the req body
 * @access Public
 */

async function loginUserController(req,res){
    const {email,password}=req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message: "invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const token = jwt.sign(
        {id : user._id,username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token",token)
    res.status(201).json({
        message: "user logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserController
 * @desc clear token from user cookie and add the token in blacklist
 * @access Public 
 */
async function logoutUserController(req,res){
    const token = req.cookies?.token

    if(token){
        await tokenBlackListModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "user logged out successfully"
    })
}

async function getMeController(req,res){
    const userId = req.user.id
    const user = await userModel.findById(userId).select("-password")
    res.status(200).json({
        message: "user details retrieved successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {registerusercontroller,
                    loginUserController,
                    logoutUserController,
                    getMeController}