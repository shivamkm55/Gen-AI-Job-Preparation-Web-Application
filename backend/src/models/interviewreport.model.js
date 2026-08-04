const mongoose = require("mongoose");

/**
 * job desciption : string
 * resume text: string
 * self description: string
 * 
 * score: number
 * 
 * technical questions 
 *      [{
 *         question: "",
 *         intention: "",
 *         answer: ""
 *                 
 *     }]
 * behavioral questions 
 *     [{ 
 *         question: "",
 *         intention: "",
 *         answer: ""
 *                 
 *     }]
 * skill gaps
 * [{
 *         skill: "",
 *         severity: "",
 *         type: string,
 *         enum: ["low", "medium", "high"],
 *   }]
 * preparation plan [{
 *       day: number,
 *       task: [string],
 *       focus: string,
 * }]
 */
const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false });

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    },
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [true, "Day is required"]
    },
    task: [{
        type: String,
        required: [true, "Task is required"]
    }],
    focus: {
        type: String,
        required: [true, "Focus is required"]
    }
}, { _id: false });

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [ true, "Job description is required"]
  },
  resumeText: {
    type: String,
    required: [ true, "Resume text is required"]
  },
  selfDescription: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
  },
  technicalQuestions: [technicalQuestionSchema],
  behavioralQuestions: [behavioralQuestionSchema],
  skillGaps: [skillGapSchema],
  preparationPlan: [preparationPlanSchema]
}, { timestamps: true });

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = InterviewReport;