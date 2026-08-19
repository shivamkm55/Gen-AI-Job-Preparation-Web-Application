const { GoogleGenAI } = require("@google/genai");
const z = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// This Zod schema is NOT sent to Gemini. It's kept purely so we can validate
// the parsed response after the fact and fail loudly if Gemini ever returns
// something that doesn't match, instead of silently saving bad data.
const interviewReportSchema = z.object({
  score: z.number(),
  technicalQuestions: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
  })),
  behavioralQuestions: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
  })),
  skillGaps: z.array(z.object({
    skill: z.string(),
    severity: z.enum(["low", "medium", "high"]),
  })),
  preparationPlan: z.array(z.object({
    day: z.number(),
    focus: z.string(),
    tasks: z.array(z.string()),
  })),
});

// FIX: hand-written in Gemini's native Schema format (a plain OpenAPI 3.0-style
// object — type/properties/items/enum/required) instead of auto-generating it
// with zod-to-json-schema. That library is known to emit keys Gemini's schema
// parser rejects, which makes Gemini silently ignore the schema and free-generate
// instead of erroring — exactly the "random garbage keys" output you saw.
const interviewReportResponseSchema = {
  type: "object",
  properties: {
    score: {
      type: "number",
      description: "the score btw 0 to 100 for the candidate based on the resume and self description of how well the candidate is fit for the job description",
    },
    technicalQuestions: {
      type: "array",
      description: "List of technical questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "the technical question that can be asked in the interview" },
          intention: { type: "string", description: "intention behind the technical question" },
          answer: { type: "string", description: "how to answer the technical question, what all points to be covered in the answer, what approach to be taken to answer the question" },
        },
        required: ["question", "intention", "answer"],
        propertyOrdering: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "array",
      description: "List of behavioral questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "the behavioral question that can be asked in the interview" },
          intention: { type: "string", description: "intention behind the behavioral question" },
          answer: { type: "string", description: "how to answer the behavioral question, what all points to be covered in the answer, what approach to be taken to answer the question" },
        },
        required: ["question", "intention", "answer"],
        propertyOrdering: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: "array",
      description: "List of skill gaps that the candidate has along with their severity",
      items: {
        type: "object",
        properties: {
          skill: { type: "string", description: "the skill gap that the candidate has" },
          severity: { type: "string", enum: ["low", "medium", "high"], description: "the severity of the skill gap" },
        },
        required: ["skill", "severity"],
        propertyOrdering: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "array",
      description: "A day-wise preparation plan for the candidate to follow to improve their skills and prepare for the interview",
      items: {
        type: "object",
        properties: {
          day: { type: "integer", description: "the day number of the preparation plan, starting from 1" },
          focus: { type: "string", description: "the main theme/topic to focus on that day, e.g. 'Advanced Database Optimization', 'System Design and Caching'" },
          tasks: {
            type: "array",
            description: "list of specific tasks to be done on that day to work on the day's focus area",
            items: { type: "string" },
          },
        },
        required: ["day", "focus", "tasks"],
        propertyOrdering: ["day", "focus", "tasks"],
      },
    },
  },
  required: ["score", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"],
  propertyOrdering: ["score", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"],
};

async function generateInterviewReport({ Resume, SelfDescription, JobDescription }) {
  const prompt = `
    generate an interview report for the candidate based on the following information:
    Resume: ${Resume}
    Self Description: ${SelfDescription}
    Job Description: ${JobDescription}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportResponseSchema,
    },
  });

  let rawReport;
  try {
    rawReport = JSON.parse(response.text);
  } catch (err) {
    throw new Error(`Gemini did not return valid JSON: ${err.message}`);
  }

  // Validate against the Zod schema so a shape mismatch throws a clear error
  // here instead of surfacing later as a confusing Mongoose cast error.
  const report = interviewReportSchema.parse(rawReport);

  console.log(report);
  return report;
}

module.exports = generateInterviewReport;