const { PDFParse } = require("pdf-parse");
const  generateInterviewReport  = require("../services/ai.service.js")
const InterviewReportModel = require("../models/interviewreport.model.js")

/**
 * @desc Generate an interview report based on the provided resume, self-description, and job description.
 * @access private
 */
async function generateInterviewReportController(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: "Resume file is required" })
    }

    const parser = new PDFParse({
        data: new Uint8Array(req.file.buffer)
    })
    const resumeContent = await parser.getText()
    await parser.destroy()
    const {
        selfDescription,
        jobDescription: lowercaseJobDescription,
        JobDescription
    } = req.body
    const jobDescription = lowercaseJobDescription ?? JobDescription

    if (!selfDescription?.trim() || !jobDescription?.trim()) {
        return res.status(400).json({
            message: "selfDescription and jobDescription are required"
        })
    }

    const interViewReportByAi = await generateInterviewReport({
        Resume: resumeContent.text,
        SelfDescription: selfDescription,
        JobDescription: jobDescription
    })

        const interviewReport = await InterviewReportModel.create({
            user: req.user._id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            data: interviewReport
        })
}

/**
 * @desc Get an interview report by its ID.
 * @access private
 */

async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params

    const interviewReport = await InterviewReportModel.findById(interviewId)

    if (!interviewReport) {
        return res.status(404).json({ message: "Interview report not found" })
    }

    res.status(200).json({
        message: "Interview report retrieved successfully",
        data: interviewReport
    })
}

/**
 * @desc Get all interview reports for the authenticated user.
 * @access private
 */

async function getAllInterviewReportsController(req, res) {
   
    const interviewReports = await InterviewReportModel
    .find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan") // Exclude the resume, selfDescription, and jobDescription fields from the response

    res.status(200).json({
        message: "Interview reports retrieved successfully",
        data: interviewReports
    })
}

module.exports= {generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController}