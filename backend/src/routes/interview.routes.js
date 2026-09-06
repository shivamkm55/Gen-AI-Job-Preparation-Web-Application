const express = require("express")
const authmiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const { upload } = require("../middleware/file.middleware")


const interviewRouter = express.Router()

/**
 * @route POST /api/interview
 * @desc Generate an interview report based on the provided resume, self-description, and job description.
 * @access private
 */
interviewRouter.post("/",authmiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/:interviewId
 * @desc Get an interview report by its ID.
 * @access private
 */
interviewRouter.get("/:interviewId",authmiddleware.authUser,interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @desc Get all interview reports for the authenticated user.
 * @access private
 */
interviewRouter.get("/",authmiddleware.authUser,interviewController.getAllInterviewReportsController)

module.exports = interviewRouter