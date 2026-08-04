const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function invokeai() {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: "What is the capital of France?",
  });

  // The SDK returns the generated text on `response.text`
  console.log(response.text);
}

module.exports = invokeai;