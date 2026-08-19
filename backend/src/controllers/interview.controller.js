const { PDFParse } = require("pdf-parse");
const  generateInterviewReport  = require("../services/ai.service.js")
const InterviewReportModel = require("../models/interviewreport.model.js")

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





module.exports= {generateInterviewReportController}